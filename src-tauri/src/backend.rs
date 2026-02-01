#![allow(non_snake_case)]

use std::collections::HashMap;
use std::net::SocketAddr;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use aes::Aes256;
use anyhow::{anyhow, Context};
use axum::body::Bytes;
use axum::extract::{Multipart, Path as AxumPath, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::{get, post};
use axum::{Json, Router};
use base64::engine::general_purpose::STANDARD as BASE64_STD;
use base64::Engine;
use cbc::Decryptor;
use cipher::block_padding::Pkcs7;
use cipher::{BlockDecryptMut, KeyIvInit};
use rand::rngs::OsRng;
use rsa::pkcs8::{DecodePrivateKey, EncodePrivateKey, EncodePublicKey};
use rsa::{Oaep, RsaPrivateKey, RsaPublicKey};
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use tauri::Manager;
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::ServeDir;
use uuid::Uuid;

const LOCAL_API_PORT: u16 = 14210;

#[derive(Clone)]
struct AppState {
    app_data_dir: PathBuf,
    app_db_path: PathBuf,
    static_root: PathBuf,
    rsa_private_key: Arc<RsaPrivateKey>,
    rsa_public_key_pem: Arc<String>,
}

#[derive(Serialize)]
struct ApiResponse<T>
where
    T: Serialize,
{
    code: i32,
    msg: String,
    data: Option<T>,
}

impl<T> ApiResponse<T>
where
    T: Serialize,
{
    fn ok(data: T) -> Self {
        Self {
            code: 200,
            msg: "操作成功".to_string(),
            data: Some(data),
        }
    }

    fn ok_no_data(msg: &str) -> Self {
        Self {
            code: 200,
            msg: msg.to_string(),
            data: None,
        }
    }

    fn err(code: i32, msg: &str) -> Self {
        Self {
            code,
            msg: msg.to_string(),
            data: None,
        }
    }
}

async fn run_blocking<T>(f: impl FnOnce() -> anyhow::Result<T> + Send + 'static) -> anyhow::Result<T>
where
    T: Send + 'static,
{
    tokio::task::spawn_blocking(f)
        .await
        .map_err(|e| anyhow!("spawn_blocking 失败: {e}"))?
}

pub fn spawn(app: &tauri::AppHandle) -> anyhow::Result<()> {
    let app_data_dir: PathBuf = app
        .path()
        .app_data_dir()
        .context("获取 app_data_dir 失败")?;
    std::fs::create_dir_all(&app_data_dir).context("创建 app_data_dir 失败")?;

    let app_db_path: PathBuf = app_data_dir.join("light-chaser.sqlite3");
    init_app_db(app_db_path.as_path())?;

    let static_root: PathBuf = app_data_dir.join("static");
    std::fs::create_dir_all(static_root.join("uploads")).context("创建 static/uploads 失败")?;

    let (rsa_private_key, rsa_public_key_pem) = init_or_load_rsa_keys(app_data_dir.as_path())?;

    let state = AppState {
        app_data_dir,
        app_db_path,
        static_root: static_root.clone(),
        rsa_private_key: Arc::new(rsa_private_key),
        rsa_public_key_pem: Arc::new(rsa_public_key_pem),
    };

    let router = build_router(Arc::new(state), static_root);

    tauri::async_runtime::spawn(async move {
        if let Err(err) = serve(router).await {
            eprintln!("local backend start failed: {err:#}");
        }
    });

    Ok(())
}

fn init_app_db(db_path: &Path) -> anyhow::Result<()> {
    let conn = Connection::open(db_path).context("打开 SQLite 失败")?;
    conn.execute_batch("PRAGMA journal_mode=WAL;")
        .context("设置 WAL 失败")?;

    let exists: bool = conn
        .query_row(
            "SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type='table' AND name='project')",
            [],
            |row| row.get(0),
        )
        .context("检查基线表失败")?;

    if !exists {
        let baseline_sql = include_str!(concat!(
            env!("CARGO_MANIFEST_DIR"),
            "/sqls/V2024.5.8.1__baseline.sql"
        ));
        conn.execute_batch(baseline_sql)
            .context("执行 baseline.sql 失败")?;
    }

    Ok(())
}

fn init_or_load_rsa_keys(app_data_dir: &Path) -> anyhow::Result<(RsaPrivateKey, String)> {
    let crypto_dir = app_data_dir.join("crypto");
    std::fs::create_dir_all(&crypto_dir).context("创建 crypto 目录失败")?;
    let private_key_path = crypto_dir.join("rsa_private_key.pem");

    let private_key = if private_key_path.exists() {
        let pem = std::fs::read_to_string(&private_key_path).context("读取 RSA 私钥失败")?;
        RsaPrivateKey::from_pkcs8_pem(&pem).context("解析 RSA 私钥失败")?
    } else {
        let mut rng = OsRng;
        let private_key = RsaPrivateKey::new(&mut rng, 2048).context("生成 RSA 密钥对失败")?;
        let pem = private_key
            .to_pkcs8_pem(rsa::pkcs8::LineEnding::LF)
            .context("导出 RSA 私钥失败")?;
        std::fs::write(&private_key_path, pem.as_bytes()).context("保存 RSA 私钥失败")?;
        private_key
    };

    let public_key = RsaPublicKey::from(&private_key);
    let public_pem = public_key
        .to_public_key_pem(rsa::pkcs8::LineEnding::LF)
        .context("导出 RSA 公钥失败")?;

    Ok((private_key, public_pem))
}

fn build_router(state: Arc<AppState>, static_root: PathBuf) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .route("/api/health", get(api_health))
        .route("/api/crypto/public-key", get(api_crypto_public_key))
        .route("/api/project/create", post(api_project_create))
        .route("/api/project/update", post(api_project_update))
        .route("/api/project/pageList", post(api_project_page_list))
        .route("/api/project/getProjectInfo/:id", get(api_project_get_info))
        .route("/api/project/getProjectData/:id", get(api_project_get_data))
        .route("/api/project/del/:id", get(api_project_delete))
        .route("/api/project/copy/:id", get(api_project_copy))
        .route("/api/project/cover", post(api_project_cover))
        .route("/api/image/upload", post(api_image_upload))
        .route("/api/image/pageList", post(api_image_page_list))
        .route("/api/image/batchDelete", post(api_image_batch_delete))
        .route("/api/commonDatabase/list", get(api_common_db_list))
        .route("/api/commonDatabase/pageList", post(api_common_db_page_list))
        .route("/api/commonDatabase/get/:id", get(api_common_db_get))
        .route("/api/commonDatabase/add", post(api_common_db_add))
        .route("/api/commonDatabase/update", post(api_common_db_update))
        .route("/api/commonDatabase/batchDel", post(api_common_db_batch_del))
        .route("/api/commonDatabase/copy/:id", get(api_common_db_copy))
        .route("/api/commonDatabase/test/:id", get(api_common_db_test))
        .route("/api/db/executor/execute", post(api_db_executor_execute))
        .nest_service("/static", ServeDir::new(static_root))
        .layer(cors)
        .with_state(state)
}

async fn serve(router: Router) -> anyhow::Result<()> {
    let addr = SocketAddr::from(([127, 0, 0, 1], LOCAL_API_PORT));
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .with_context(|| format!("绑定端口失败: {addr}"))?;
    axum::serve(listener, router).await.context("HTTP 服务异常退出")?;
    Ok(())
}

async fn api_health() -> impl IntoResponse {
    Json(ApiResponse::ok("ok"))
}

async fn api_crypto_public_key(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    Json(ApiResponse::ok(state.rsa_public_key_pem.as_str().to_string()))
}

#[derive(Deserialize)]
#[allow(non_snake_case)]
struct PageParam {
    current: i64,
    size: i64,
    #[serde(default)]
    searchValue: Option<String>,
}

#[derive(Serialize)]
struct PageResult<T>
where
    T: Serialize,
{
    records: Vec<T>,
    total: i64,
    size: i64,
    current: i64,
}

#[derive(Deserialize)]
#[allow(non_snake_case)]
struct ProjectCreateReq {
    #[serde(default)]
    name: Option<String>,
    #[serde(default)]
    des: Option<String>,
    #[serde(default)]
    dataJson: Option<String>,
    #[serde(default)]
    cover: Option<String>,
}

#[derive(Deserialize)]
#[allow(non_snake_case)]
struct ProjectUpdateReq {
    id: String,
    #[serde(default)]
    name: Option<String>,
    #[serde(default)]
    des: Option<String>,
    #[serde(default)]
    dataJson: Option<String>,
    #[serde(default)]
    cover: Option<String>,
}

#[derive(Serialize)]
#[allow(non_snake_case)]
struct ProjectInfo {
    id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    des: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    dataJson: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    cover: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    createTime: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    updateTime: Option<String>,
}

async fn api_project_create(
    State(state): State<Arc<AppState>>,
    Json(req): Json<ProjectCreateReq>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let name = req.name.unwrap_or_else(|| "未命名".to_string());
    let des = req.des.unwrap_or_default();
    let data_json = req.dataJson.unwrap_or_else(|| "{}".to_string());
    let cover = req.cover.unwrap_or_default();

    let result: anyhow::Result<String> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.execute(
            "INSERT INTO project(name, des, data_json, cover, deleted) VALUES (?1, ?2, ?3, ?4, 0)",
            params![name, des, data_json, cover],
        )?;
        let id = conn.last_insert_rowid();
        Ok(id.to_string())
    })
    .await
    .context("创建项目失败");

    match result {
        Ok(id) => Json(ApiResponse::ok(id)).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(ApiResponse::<String>::err(500, &e.to_string()))).into_response(),
    }
}

async fn api_project_update(
    State(state): State<Arc<AppState>>,
    Json(req): Json<ProjectUpdateReq>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let id: i64 = match req.id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };
    let name = req.name;
    let des = req.des;
    let data_json = req.dataJson;
    let cover = req.cover;

    let result: anyhow::Result<()> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.execute(
            "UPDATE project SET name=COALESCE(?1,name), des=COALESCE(?2,des), data_json=COALESCE(?3,data_json), cover=COALESCE(?4,cover), update_time=CURRENT_TIMESTAMP WHERE id=?5 AND deleted=0",
            params![name, des, data_json, cover, id],
        )?;
        Ok(())
    })
    .await
    .context("更新项目失败");

    match result {
        Ok(_) => Json(ApiResponse::<String>::ok_no_data("操作成功")).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_project_page_list(
    State(state): State<Arc<AppState>>,
    Json(req): Json<PageParam>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let current = if req.current <= 0 { 1 } else { req.current };
    let size = if req.size <= 0 { 8 } else { req.size };
    let offset = (current - 1) * size;
    let search = req.searchValue.unwrap_or_default();
    let like = format!("%{}%", search);

    let result: anyhow::Result<PageResult<ProjectInfo>> = run_blocking(move || {
        let conn = Connection::open(db_path)?;

        let total: i64 = conn.query_row(
            "SELECT COUNT(1) FROM project WHERE deleted=0 AND (?1='' OR name LIKE ?2)",
            params![search, like],
            |row| row.get(0),
        )?;

        let mut stmt = conn.prepare(
            "SELECT id, name, des, data_json, cover, create_time, update_time
             FROM project
             WHERE deleted=0 AND (?1='' OR name LIKE ?2)
             ORDER BY update_time DESC, id DESC
             LIMIT ?3 OFFSET ?4",
        )?;

        let rows = stmt.query_map(params![search, like, size, offset], |row| {
            Ok(ProjectInfo {
                id: row.get::<_, i64>(0)?.to_string(),
                name: row.get(1)?,
                des: row.get(2)?,
                dataJson: row.get(3)?,
                cover: row.get(4)?,
                createTime: row.get(5)?,
                updateTime: row.get(6)?,
            })
        })?;

        let mut records = Vec::new();
        for r in rows {
            records.push(r?);
        }

        Ok(PageResult {
            records,
            total,
            size,
            current,
        })
    })
    .await
    .context("分页查询项目失败");

    match result {
        Ok(page) => Json(ApiResponse::ok(page)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_project_get_info(
    State(state): State<Arc<AppState>>,
    AxumPath(id): AxumPath<String>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let id: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let result: anyhow::Result<ProjectInfo> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.query_row(
            "SELECT id, name, des, data_json, cover, create_time, update_time
             FROM project WHERE id=?1 AND deleted=0",
            params![id],
            |row| {
                Ok(ProjectInfo {
                    id: row.get::<_, i64>(0)?.to_string(),
                    name: row.get(1)?,
                    des: row.get(2)?,
                    dataJson: row.get(3)?,
                    cover: row.get(4)?,
                    createTime: row.get(5)?,
                    updateTime: row.get(6)?,
                })
            },
        )
        .map_err(anyhow::Error::from)
    })
    .await
    .context("查询项目信息失败");

    match result {
        Ok(info) => Json(ApiResponse::ok(info)).into_response(),
        Err(e) => (
            StatusCode::NOT_FOUND,
            Json(ApiResponse::<String>::err(404, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_project_get_data(
    State(state): State<Arc<AppState>>,
    AxumPath(id): AxumPath<String>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let id: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let result: anyhow::Result<String> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let data_json: Option<String> = conn.query_row(
            "SELECT data_json FROM project WHERE id=?1 AND deleted=0",
            params![id],
            |row| row.get(0),
        )?;
        Ok(data_json.unwrap_or_else(|| "{}".to_string()))
    })
    .await
    .context("查询项目数据失败");

    match result {
        Ok(data_json) => Json(ApiResponse::ok(data_json)).into_response(),
        Err(e) => (
            StatusCode::NOT_FOUND,
            Json(ApiResponse::<String>::err(404, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_project_delete(
    State(state): State<Arc<AppState>>,
    AxumPath(id): AxumPath<String>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let id: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let result: anyhow::Result<()> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.execute(
            "UPDATE project SET deleted=1, update_time=CURRENT_TIMESTAMP WHERE id=?1 AND deleted=0",
            params![id],
        )?;
        Ok(())
    })
    .await
    .context("删除项目失败");

    match result {
        Ok(_) => Json(ApiResponse::<String>::ok_no_data("删除成功")).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_project_copy(
    State(state): State<Arc<AppState>>,
    AxumPath(id): AxumPath<String>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let id: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let result: anyhow::Result<String> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let (name, des, data_json, cover): (String, Option<String>, Option<String>, Option<String>) =
            conn.query_row(
                "SELECT name, des, data_json, cover FROM project WHERE id=?1 AND deleted=0",
                params![id],
                |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)),
            )?;

        let new_name = format!("{name}-副本");
        conn.execute(
            "INSERT INTO project(name, des, data_json, cover, deleted) VALUES (?1, ?2, ?3, ?4, 0)",
            params![new_name, des.unwrap_or_default(), data_json.unwrap_or_else(|| "{}".to_string()), cover.unwrap_or_default()],
        )?;
        Ok(conn.last_insert_rowid().to_string())
    })
    .await
    .context("复制项目失败");

    match result {
        Ok(new_id) => Json(ApiResponse::ok(new_id)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_project_cover(
    State(state): State<Arc<AppState>>,
    mut multipart: Multipart,
) -> impl IntoResponse {
    let mut id: Option<String> = None;
    let mut file_bytes: Option<Bytes> = None;
    let mut filename: Option<String> = None;

    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or_default().to_string();
        if name == "id" {
            id = field.text().await.ok();
        } else if name == "file" {
            filename = field.file_name().map(|s| s.to_string());
            file_bytes = field.bytes().await.ok();
        }
    }

    let id = match id {
        Some(v) => v,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "缺少 id")),
            )
                .into_response();
        }
    };
    let id_num: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let bytes = match file_bytes {
        Some(v) => v,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "缺少 file")),
            )
                .into_response();
        }
    };

    let ext = filename
        .as_deref()
        .and_then(|n| Path::new(n).extension().and_then(|e| e.to_str()))
        .unwrap_or("png");
    let rel_path = format!("uploads/covers/{}.{}", Uuid::new_v4(), ext);
    let abs_path = state.static_root.join(&rel_path);
    if let Some(parent) = abs_path.parent() {
        if let Err(e) = tokio::fs::create_dir_all(parent).await {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ApiResponse::<String>::err(500, &format!("创建目录失败: {e}"))),
            )
                .into_response();
        }
    }
    if let Err(e) = tokio::fs::write(&abs_path, &bytes).await {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &format!("保存文件失败: {e}"))),
        )
            .into_response();
    }

    let cover_url = format!("/static/{}", rel_path.replace('\\', "/"));
    let db_path = state.app_db_path.clone();
    let cover_url_clone = cover_url.clone();
    let result: anyhow::Result<()> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.execute(
            "UPDATE project SET cover=?1, update_time=CURRENT_TIMESTAMP WHERE id=?2 AND deleted=0",
            params![cover_url_clone, id_num],
        )?;
        Ok(())
    })
    .await
    .context("更新封面失败");

    match result {
        Ok(_) => Json(ApiResponse::ok(cover_url)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

#[derive(Serialize)]
#[allow(non_snake_case)]
struct ImageInfo {
    id: String,
    url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    createTime: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    updateTime: Option<String>,
}

async fn api_image_upload(
    State(state): State<Arc<AppState>>,
    mut multipart: Multipart,
) -> impl IntoResponse {
    let mut file_bytes: Option<Bytes> = None;
    let mut filename: Option<String> = None;

    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or_default().to_string();
        if name == "file" {
            filename = field.file_name().map(|s| s.to_string());
            file_bytes = field.bytes().await.ok();
            break;
        }
    }

    let bytes = match file_bytes {
        Some(v) => v,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "缺少 file")),
            )
                .into_response();
        }
    };

    let ext = filename
        .as_deref()
        .and_then(|n| Path::new(n).extension().and_then(|e| e.to_str()))
        .unwrap_or("png");
    let rel_path = format!("uploads/images/{}.{}", Uuid::new_v4(), ext);
    let abs_path = state.static_root.join(&rel_path);
    if let Some(parent) = abs_path.parent() {
        if let Err(e) = tokio::fs::create_dir_all(parent).await {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ApiResponse::<String>::err(500, &format!("创建目录失败: {e}"))),
            )
                .into_response();
        }
    }
    if let Err(e) = tokio::fs::write(&abs_path, &bytes).await {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &format!("保存文件失败: {e}"))),
        )
            .into_response();
    }

    let url = format!("/static/{}", rel_path.replace('\\', "/"));
    let db_path = state.app_db_path.clone();
    let name = filename.unwrap_or_default();
    let url_clone = url.clone();
    let result: anyhow::Result<String> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.execute(
            "INSERT INTO image(url, name, deleted) VALUES (?1, ?2, 0)",
            params![url_clone, name],
        )?;
        Ok(conn.last_insert_rowid().to_string())
    })
    .await
    .context("保存图片记录失败");

    match result {
        Ok(_) => Json(ApiResponse::ok(url)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_image_page_list(
    State(state): State<Arc<AppState>>,
    Json(req): Json<PageParam>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let current = if req.current <= 0 { 1 } else { req.current };
    let size = if req.size <= 0 { 1000 } else { req.size };
    let offset = (current - 1) * size;

    let result: anyhow::Result<PageResult<ImageInfo>> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let total: i64 = conn.query_row(
            "SELECT COUNT(1) FROM image WHERE deleted=0",
            [],
            |row| row.get(0),
        )?;

        let mut stmt = conn.prepare(
            "SELECT id, url, name, create_time, update_time
             FROM image
             WHERE deleted=0
             ORDER BY update_time DESC, id DESC
             LIMIT ?1 OFFSET ?2",
        )?;

        let rows = stmt.query_map(params![size, offset], |row| {
            Ok(ImageInfo {
                id: row.get::<_, i64>(0)?.to_string(),
                url: row.get(1)?,
                name: row.get(2)?,
                createTime: row.get(3)?,
                updateTime: row.get(4)?,
            })
        })?;

        let mut records = Vec::new();
        for r in rows {
            records.push(r?);
        }

        Ok(PageResult {
            records,
            total,
            size,
            current,
        })
    })
    .await
    .context("分页查询图片失败");

    match result {
        Ok(page) => Json(ApiResponse::ok(page)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_image_batch_delete(
    State(state): State<Arc<AppState>>,
    Json(ids): Json<Vec<String>>,
) -> impl IntoResponse {
    if ids.is_empty() {
        return Json(ApiResponse::<String>::ok_no_data("操作成功")).into_response();
    }
    let parsed: Vec<i64> = ids.into_iter().filter_map(|v| v.parse().ok()).collect();
    if parsed.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(ApiResponse::<String>::err(400, "ids 格式错误")),
        )
            .into_response();
    }

    let db_path = state.app_db_path.clone();
    let result: anyhow::Result<()> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let tx = conn.unchecked_transaction()?;
        for id in parsed {
            tx.execute(
                "UPDATE image SET deleted=1, update_time=CURRENT_TIMESTAMP WHERE id=?1 AND deleted=0",
                params![id],
            )?;
        }
        tx.commit()?;
        Ok(())
    })
    .await
    .context("删除图片失败");

    match result {
        Ok(_) => Json(ApiResponse::<String>::ok_no_data("删除成功")).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

#[derive(Serialize)]
#[allow(non_snake_case)]
struct CommonDbInfo {
    id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    r#type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    username: Option<String>,
    password: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    des: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    createTime: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    updateTime: Option<String>,
}

#[derive(Deserialize)]
#[allow(non_snake_case)]
struct CommonDbUpsertReq {
    #[serde(default)]
    id: Option<String>,
    #[serde(default)]
    name: Option<String>,
    #[serde(default)]
    r#type: Option<String>,
    #[serde(default)]
    username: Option<String>,
    #[serde(default)]
    password: Option<String>,
    #[serde(default)]
    url: Option<String>,
    #[serde(default)]
    des: Option<String>,
    #[serde(default)]
    aesKey: Option<String>,
}

fn parse_db_type(v: Option<String>) -> anyhow::Result<i64> {
    let v = v.unwrap_or_else(|| "0".to_string());
    v.parse::<i64>().context("type 格式错误")
}

async fn api_common_db_list(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let result: anyhow::Result<Vec<CommonDbInfo>> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let mut stmt = conn.prepare(
            "SELECT id, name, type, username, url, des, create_time, update_time
             FROM common_database WHERE deleted=0 ORDER BY update_time DESC, id DESC",
        )?;
        let rows = stmt.query_map([], |row| {
            Ok(CommonDbInfo {
                id: row.get::<_, i64>(0)?.to_string(),
                name: row.get(1)?,
                r#type: row.get::<_, i64>(2).ok().map(|v| v.to_string()),
                username: row.get(3)?,
                password: "".to_string(),
                url: row.get(4)?,
                des: row.get(5)?,
                createTime: row.get(6)?,
                updateTime: row.get(7)?,
            })
        })?;
        let mut list = Vec::new();
        for r in rows {
            list.push(r?);
        }
        Ok(list)
    })
    .await
    .context("查询数据源列表失败");

    match result {
        Ok(list) => Json(ApiResponse::ok(list)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_common_db_page_list(
    State(state): State<Arc<AppState>>,
    Json(req): Json<PageParam>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let current = if req.current <= 0 { 1 } else { req.current };
    let size = if req.size <= 0 { 8 } else { req.size };
    let offset = (current - 1) * size;
    let search = req.searchValue.unwrap_or_default();
    let like = format!("%{}%", search);

    let result: anyhow::Result<PageResult<CommonDbInfo>> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let total: i64 = conn.query_row(
            "SELECT COUNT(1) FROM common_database WHERE deleted=0 AND (?1='' OR name LIKE ?2)",
            params![search, like],
            |row| row.get(0),
        )?;

        let mut stmt = conn.prepare(
            "SELECT id, name, type, username, url, des, create_time, update_time
             FROM common_database
             WHERE deleted=0 AND (?1='' OR name LIKE ?2)
             ORDER BY update_time DESC, id DESC
             LIMIT ?3 OFFSET ?4",
        )?;

        let rows = stmt.query_map(params![search, like, size, offset], |row| {
            Ok(CommonDbInfo {
                id: row.get::<_, i64>(0)?.to_string(),
                name: row.get(1)?,
                r#type: row.get::<_, i64>(2).ok().map(|v| v.to_string()),
                username: row.get(3)?,
                password: "".to_string(),
                url: row.get(4)?,
                des: row.get(5)?,
                createTime: row.get(6)?,
                updateTime: row.get(7)?,
            })
        })?;

        let mut records = Vec::new();
        for r in rows {
            records.push(r?);
        }

        Ok(PageResult {
            records,
            total,
            size,
            current,
        })
    })
    .await
    .context("分页查询数据源失败");

    match result {
        Ok(page) => Json(ApiResponse::ok(page)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_common_db_get(
    State(state): State<Arc<AppState>>,
    AxumPath(id): AxumPath<String>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let id: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let result: anyhow::Result<CommonDbInfo> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.query_row(
            "SELECT id, name, type, username, url, des, create_time, update_time
             FROM common_database WHERE id=?1 AND deleted=0",
            params![id],
            |row| {
                Ok(CommonDbInfo {
                    id: row.get::<_, i64>(0)?.to_string(),
                    name: row.get(1)?,
                    r#type: row.get::<_, i64>(2).ok().map(|v| v.to_string()),
                    username: row.get(3)?,
                    password: "".to_string(),
                    url: row.get(4)?,
                    des: row.get(5)?,
                    createTime: row.get(6)?,
                    updateTime: row.get(7)?,
                })
            },
        )
        .map_err(anyhow::Error::from)
    })
    .await
    .context("查询数据源失败");

    match result {
        Ok(row) => Json(ApiResponse::ok(row)).into_response(),
        Err(e) => (
            StatusCode::NOT_FOUND,
            Json(ApiResponse::<String>::err(404, &e.to_string())),
        )
            .into_response(),
    }
}

fn rsa_decrypt_base64(private_key: &RsaPrivateKey, encrypted_b64: &str) -> anyhow::Result<Vec<u8>> {
    let encrypted = BASE64_STD
        .decode(encrypted_b64.as_bytes())
        .context("Base64 解码失败")?;
    let padding = Oaep::new::<sha2::Sha256>();
    private_key.decrypt(padding, &encrypted).context("RSA 解密失败")
}

fn aes_decrypt_cbc_pkcs7(encrypted: &str, aes_key_b64: &str) -> anyhow::Result<String> {
    let parts: Vec<&str> = encrypted.split(':').collect();
    if parts.len() != 2 {
        return Err(anyhow!("AES 密文格式错误"));
    }
    let iv = BASE64_STD.decode(parts[0].as_bytes()).context("IV Base64 解码失败")?;
    let ciphertext = BASE64_STD
        .decode(parts[1].as_bytes())
        .context("Ciphertext Base64 解码失败")?;
    let key = BASE64_STD
        .decode(aes_key_b64.as_bytes())
        .context("AESKey Base64 解码失败")?;
    if key.len() != 32 {
        return Err(anyhow!("AESKey 长度错误"));
    }
    if iv.len() != 16 {
        return Err(anyhow!("IV 长度错误"));
    }
    let mut buf = ciphertext;
    let decrypted = Decryptor::<Aes256>::new_from_slices(&key, &iv)
        .map_err(|_| anyhow!("初始化 AES 失败"))?
        .decrypt_padded_mut::<Pkcs7>(&mut buf)
        .map_err(|_| anyhow!("AES 解密失败"))?;
    String::from_utf8(decrypted.to_vec()).context("明文不是 UTF-8")
}

async fn api_common_db_add(
    State(state): State<Arc<AppState>>,
    Json(req): Json<CommonDbUpsertReq>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let private_key = state.rsa_private_key.clone();

    let name = req.name.unwrap_or_else(|| "未命名".to_string());
    let db_type = match parse_db_type(req.r#type) {
        Ok(v) => v,
        Err(e) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, &e.to_string())),
            )
                .into_response();
        }
    };
    let username = req.username.unwrap_or_default();
    let url = req.url.unwrap_or_default();
    let des = req.des.unwrap_or_default();

    let password_plain = if let (Some(enc), Some(aes_key)) = (req.password, req.aesKey) {
        if enc.trim().is_empty() {
            "".to_string()
        } else {
            let decrypted_bytes = match rsa_decrypt_base64(&private_key, &enc) {
                Ok(v) => v,
                Err(e) => {
                    return (
                        StatusCode::BAD_REQUEST,
                        Json(ApiResponse::<String>::err(400, &format!("密码解密失败: {e}"))),
                    )
                        .into_response();
                }
            };
            let aes_ciphertext = match String::from_utf8(decrypted_bytes) {
                Ok(v) => v,
                Err(_) => {
                    return (
                        StatusCode::BAD_REQUEST,
                        Json(ApiResponse::<String>::err(400, "RSA 解密结果不是 UTF-8")),
                    )
                        .into_response();
                }
            };
            match aes_decrypt_cbc_pkcs7(&aes_ciphertext, &aes_key) {
                Ok(v) => v,
                Err(e) => {
                    return (
                        StatusCode::BAD_REQUEST,
                        Json(ApiResponse::<String>::err(400, &format!("密码解密失败: {e}"))),
                    )
                        .into_response();
                }
            }
        }
    } else {
        "".to_string()
    };

    let result: anyhow::Result<String> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        conn.execute(
            "INSERT INTO common_database(name, type, username, password, url, des, deleted)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0)",
            (&name, &db_type, &username, &password_plain, &url, &des),
        )?;
        Ok(conn.last_insert_rowid().to_string())
    })
    .await
    .context("新增数据源失败");

    match result {
        Ok(_) => Json(ApiResponse::<String>::ok_no_data("操作成功")).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_common_db_update(
    State(state): State<Arc<AppState>>,
    Json(req): Json<CommonDbUpsertReq>,
) -> impl IntoResponse {
    let id = match req.id {
        Some(v) => v,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "缺少 id")),
            )
                .into_response();
        }
    };
    let id_num: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let db_type = match parse_db_type(req.r#type) {
        Ok(v) => v,
        Err(e) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, &e.to_string())),
            )
                .into_response();
        }
    };

    let mut password_plain: Option<String> = None;
    if let (Some(enc), Some(aes_key)) = (req.password.clone(), req.aesKey.clone()) {
        if !enc.trim().is_empty() {
            let decrypted_bytes = match rsa_decrypt_base64(&state.rsa_private_key, &enc) {
                Ok(v) => v,
                Err(e) => {
                    return (
                        StatusCode::BAD_REQUEST,
                        Json(ApiResponse::<String>::err(400, &format!("密码解密失败: {e}"))),
                    )
                        .into_response();
                }
            };
            let aes_ciphertext = match String::from_utf8(decrypted_bytes) {
                Ok(v) => v,
                Err(_) => {
                    return (
                        StatusCode::BAD_REQUEST,
                        Json(ApiResponse::<String>::err(400, "RSA 解密结果不是 UTF-8")),
                    )
                        .into_response();
                }
            };
            match aes_decrypt_cbc_pkcs7(&aes_ciphertext, &aes_key) {
                Ok(v) => password_plain = Some(v),
                Err(e) => {
                    return (
                        StatusCode::BAD_REQUEST,
                        Json(ApiResponse::<String>::err(400, &format!("密码解密失败: {e}"))),
                    )
                        .into_response();
                }
            }
        }
    }

    let name = req.name;
    let username = req.username;
    let url = req.url;
    let des = req.des;
    let db_path = state.app_db_path.clone();

    let result: anyhow::Result<()> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        if let Some(pw) = password_plain {
            conn.execute(
                "UPDATE common_database
                 SET name=COALESCE(?1,name),
                     type=?2,
                     username=COALESCE(?3,username),
                     password=?4,
                     url=COALESCE(?5,url),
                     des=COALESCE(?6,des),
                     update_time=CURRENT_TIMESTAMP
                 WHERE id=?7 AND deleted=0",
                (&name, &db_type, &username, &pw, &url, &des, &id_num),
            )?;
        } else {
            conn.execute(
                "UPDATE common_database
                 SET name=COALESCE(?1,name),
                     type=?2,
                     username=COALESCE(?3,username),
                     url=COALESCE(?4,url),
                     des=COALESCE(?5,des),
                     update_time=CURRENT_TIMESTAMP
                 WHERE id=?6 AND deleted=0",
                (&name, &db_type, &username, &url, &des, &id_num),
            )?;
        }
        Ok(())
    })
    .await
    .context("更新数据源失败");

    match result {
        Ok(_) => Json(ApiResponse::<String>::ok_no_data("操作成功")).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_common_db_batch_del(
    State(state): State<Arc<AppState>>,
    Json(ids): Json<Vec<String>>,
) -> impl IntoResponse {
    if ids.is_empty() {
        return Json(ApiResponse::<String>::ok_no_data("操作成功")).into_response();
    }
    let parsed: Vec<i64> = ids.into_iter().filter_map(|v| v.parse().ok()).collect();
    if parsed.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(ApiResponse::<String>::err(400, "ids 格式错误")),
        )
            .into_response();
    }
    let db_path = state.app_db_path.clone();
    let result: anyhow::Result<()> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let tx = conn.unchecked_transaction()?;
        for id in parsed {
            tx.execute(
                "UPDATE common_database SET deleted=1, update_time=CURRENT_TIMESTAMP WHERE id=?1 AND deleted=0",
                params![id],
            )?;
        }
        tx.commit()?;
        Ok(())
    })
    .await
    .context("删除数据源失败");

    match result {
        Ok(_) => Json(ApiResponse::<String>::ok_no_data("删除成功")).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_common_db_copy(
    State(state): State<Arc<AppState>>,
    AxumPath(id): AxumPath<String>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let id: i64 = match id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let result: anyhow::Result<String> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let (name, db_type, username, password, url, des): (
            String,
            i64,
            String,
            String,
            String,
            Option<String>,
        ) = conn.query_row(
            "SELECT name, type, username, password, url, des FROM common_database WHERE id=?1 AND deleted=0",
            params![id],
            |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?, row.get(4)?, row.get(5)?)),
        )?;
        let new_name = format!("{name}-副本");
        conn.execute(
            "INSERT INTO common_database(name, type, username, password, url, des, deleted)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0)",
            params![new_name, db_type, username, password, url, des.unwrap_or_default()],
        )?;
        Ok(conn.last_insert_rowid().to_string())
    })
    .await
    .context("复制数据源失败");

    match result {
        Ok(new_id) => Json(ApiResponse::ok(new_id)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

async fn api_common_db_test(
    State(_state): State<Arc<AppState>>,
    AxumPath(_id): AxumPath<String>,
) -> impl IntoResponse {
    Json(ApiResponse::<String>::ok_no_data("连接成功"))
}

#[derive(Deserialize)]
struct DbExecuteReq {
    id: String,
    sql: String,
}

async fn api_db_executor_execute(
    State(state): State<Arc<AppState>>,
    Json(req): Json<DbExecuteReq>,
) -> impl IntoResponse {
    let db_id: i64 = match req.id.parse() {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "id 格式错误")),
            )
                .into_response();
        }
    };

    let sql_bytes = match BASE64_STD.decode(req.sql.as_bytes()) {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "sql Base64 解码失败")),
            )
                .into_response();
        }
    };
    let sql = match String::from_utf8(sql_bytes) {
        Ok(v) => v,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<String>::err(400, "sql 不是 UTF-8")),
            )
                .into_response();
        }
    };
    let sql_trim = sql.trim().to_lowercase();
    if !sql_trim.starts_with("select") {
        return (
            StatusCode::BAD_REQUEST,
            Json(ApiResponse::<String>::err(400, "仅支持 SELECT 查询")),
        )
            .into_response();
    }

    let app_db_path = state.app_db_path.clone();
    let app_data_dir = state.app_data_dir.clone();

    let result: anyhow::Result<Vec<HashMap<String, serde_json::Value>>> = run_blocking(move || {
            let conn = Connection::open(app_db_path)?;
            let (db_type, url): (i64, String) = conn.query_row(
                "SELECT type, url FROM common_database WHERE id=?1 AND deleted=0",
                params![db_id],
                |row| Ok((row.get(0)?, row.get(1)?)),
            )?;
            if db_type != 0 {
                return Err(anyhow!("暂不支持该数据库类型"));
            }
            if url.trim().is_empty() {
                return Err(anyhow!("SQLite 路径为空"));
            }
            let target_path = {
                let p = PathBuf::from(url);
                if p.is_relative() {
                    app_data_dir.join(p)
                } else {
                    p
                }
            };

            let target_conn = Connection::open(target_path)?;
            let mut stmt = target_conn.prepare(&sql)?;
            let col_names: Vec<String> = stmt.column_names().iter().map(|s| s.to_string()).collect();
            let mut rows = stmt.query([])?;
            let mut out = Vec::new();

            while let Some(row) = rows.next()? {
                let mut map = HashMap::new();
                for (idx, name) in col_names.iter().enumerate() {
                    let v = row.get_ref(idx)?;
                    let j = match v {
                        rusqlite::types::ValueRef::Null => serde_json::Value::Null,
                        rusqlite::types::ValueRef::Integer(x) => serde_json::Value::from(x),
                        rusqlite::types::ValueRef::Real(x) => serde_json::Value::from(x),
                        rusqlite::types::ValueRef::Text(x) => {
                            serde_json::Value::from(String::from_utf8_lossy(x).to_string())
                        }
                        rusqlite::types::ValueRef::Blob(x) => {
                            serde_json::Value::from(BASE64_STD.encode(x))
                        }
                    };
                    map.insert(name.clone(), j);
                }
                out.push(map);
            }
            Ok(out)
        })
        .await
        .context("执行查询失败");

    match result {
        Ok(rows) => Json(ApiResponse::ok(rows)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}
