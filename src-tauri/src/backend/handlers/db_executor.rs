//! SQL 执行器接口。
//!
//! 当前实现策略：
//! - 前端传入的 sql 为 Base64 编码字符串
//! - 仅允许 `SELECT`（防止误写/误删）
//! - 仅支持 SQLite 数据源（type=0），并根据 url 打开目标库进行查询

use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;

use anyhow::{anyhow, Context};
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use base64::engine::general_purpose::STANDARD as BASE64_STD;
use base64::Engine;
use rusqlite::{params, Connection};

use crate::backend::models::DbExecuteReq;
use crate::backend::response::ApiResponse;
use crate::backend::state::AppState;
use crate::backend::util::run_blocking;

pub async fn db_executor_execute(
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
        let col_names: Vec<String> = stmt
            .column_names()
            .iter()
            .map(|s| s.to_string())
            .collect();
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
                    rusqlite::types::ValueRef::Blob(x) => serde_json::Value::from(BASE64_STD.encode(x)),
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
