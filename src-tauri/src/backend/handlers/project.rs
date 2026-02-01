//! 项目（project）相关接口。
//!
//! 主要职责：
//! - CRUD：创建/更新/删除/复制
//! - 查询：分页列表、项目信息、项目 data_json
//! - 文件：封面上传（落盘到 /static/uploads/covers，并回写 cover 字段）

use std::path::Path;
use std::sync::Arc;

use anyhow::Context;
use axum::body::Bytes;
use axum::extract::{Multipart, Path as AxumPath, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use rusqlite::{params, Connection};
use uuid::Uuid;

use crate::backend::models::{PageParam, PageResult, ProjectCreateReq, ProjectInfo, ProjectUpdateReq};
use crate::backend::response::ApiResponse;
use crate::backend::state::AppState;
use crate::backend::util::run_blocking;

pub async fn project_create(
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
        Ok(conn.last_insert_rowid().to_string())
    })
    .await
    .context("创建项目失败");

    match result {
        Ok(id) => Json(ApiResponse::ok(id)).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ApiResponse::<String>::err(500, &e.to_string())),
        )
            .into_response(),
    }
}

pub async fn project_update(
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

pub async fn project_page_list(
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

pub async fn project_get_info(
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

pub async fn project_get_data(
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

pub async fn project_delete(
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

pub async fn project_copy(
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
            params![
                new_name,
                des.unwrap_or_default(),
                data_json.unwrap_or_else(|| "{}".to_string()),
                cover.unwrap_or_default()
            ],
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

pub async fn project_cover(
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
