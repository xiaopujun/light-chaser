//! 数据源（common_database）相关接口。
//!
//! 主要职责：
//! - 维护数据源配置：新增/更新/删除/复制/查询
//! - 密码处理：兼容前端 AES + RSA 加密传输，后端解密后入库
//! - 连接测试：目前提供最小“连通性”响应（后续可扩展为真实连接）

use std::sync::Arc;

use anyhow::Context;
use axum::extract::{Path as AxumPath, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use rusqlite::{params, Connection};

use crate::backend::crypto;
use crate::backend::models::{CommonDbInfo, CommonDbUpsertReq, PageParam, PageResult};
use crate::backend::response::ApiResponse;
use crate::backend::state::AppState;
use crate::backend::util::run_blocking;

fn parse_db_type(v: Option<String>) -> anyhow::Result<i64> {
    let v = v.unwrap_or_else(|| "0".to_string());
    v.parse::<i64>().context("type 格式错误")
}

pub async fn common_db_list(State(state): State<Arc<AppState>>) -> impl IntoResponse {
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

pub async fn common_db_page_list(
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

pub async fn common_db_get(
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

pub async fn common_db_add(
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
            let decrypted_bytes = match crypto::rsa_decrypt_base64(&private_key, &enc) {
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
            match crypto::aes_decrypt_cbc_pkcs7(&aes_ciphertext, &aes_key) {
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

pub async fn common_db_update(
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
            let decrypted_bytes = match crypto::rsa_decrypt_base64(&state.rsa_private_key, &enc) {
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
            match crypto::aes_decrypt_cbc_pkcs7(&aes_ciphertext, &aes_key) {
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

pub async fn common_db_batch_del(
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

pub async fn common_db_copy(
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
            |row| {
                Ok((
                    row.get(0)?,
                    row.get(1)?,
                    row.get(2)?,
                    row.get(3)?,
                    row.get(4)?,
                    row.get(5)?,
                ))
            },
        )?;
        let new_name = format!("{name}-副本");
        conn.execute(
            "INSERT INTO common_database(name, type, username, password, url, des, deleted)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0)",
            params![
                new_name,
                db_type,
                username,
                password,
                url,
                des.unwrap_or_default()
            ],
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

pub async fn common_db_test(
    State(_state): State<Arc<AppState>>,
    AxumPath(_id): AxumPath<String>,
) -> impl IntoResponse {
    Json(ApiResponse::<String>::ok_no_data("连接成功"))
}
