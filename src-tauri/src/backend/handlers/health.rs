//! 健康检查接口（用于本地后端存活探测）。

use axum::response::IntoResponse;
use axum::Json;

use crate::backend::response::ApiResponse;

pub async fn health() -> impl IntoResponse {
    Json(ApiResponse::ok("ok"))
}
