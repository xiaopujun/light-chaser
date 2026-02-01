//! 加密相关接口。
//!
//! 目前仅暴露 RSA 公钥，供前端在保存敏感信息时加密传输。

use std::sync::Arc;

use axum::extract::State;
use axum::response::IntoResponse;
use axum::Json;

use crate::backend::response::ApiResponse;
use crate::backend::state::AppState;

pub async fn crypto_public_key(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    Json(ApiResponse::ok(state.rsa_public_key_pem.as_str().to_string()))
}
