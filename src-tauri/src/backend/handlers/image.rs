//! 图片（image）相关接口。
//!
//! 主要职责：
//! - 上传：文件落盘到 /static/uploads/images，并插入 image 表记录
//! - 查询：分页列表（前端一般用于素材库）
//! - 删除：批量软删除（deleted=1）

use std::path::Path;
use std::sync::Arc;

use anyhow::Context;
use axum::body::Bytes;
use axum::extract::{Multipart, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use rusqlite::{params, Connection};
use uuid::Uuid;

use crate::backend::models::{ImageInfo, PageParam, PageResult};
use crate::backend::response::ApiResponse;
use crate::backend::state::AppState;
use crate::backend::util::run_blocking;

pub async fn image_upload(
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

pub async fn image_page_list(
    State(state): State<Arc<AppState>>,
    Json(req): Json<PageParam>,
) -> impl IntoResponse {
    let db_path = state.app_db_path.clone();
    let current = if req.current <= 0 { 1 } else { req.current };
    let size = if req.size <= 0 { 1000 } else { req.size };
    let offset = (current - 1) * size;

    let result: anyhow::Result<PageResult<ImageInfo>> = run_blocking(move || {
        let conn = Connection::open(db_path)?;
        let total: i64 = conn.query_row("SELECT COUNT(1) FROM image WHERE deleted=0", [], |row| {
            row.get(0)
        })?;

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

pub async fn image_batch_delete(
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
