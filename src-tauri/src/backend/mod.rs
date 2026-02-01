//! Tauri 桌面端本地后端（Axum）。
//!
//! 目标：
//! - 以 `127.0.0.1:14210` 提供本地 HTTP API，供前端直接调用；
//! - 启动时初始化 app_data_dir 下的 SQLite（baseline.sql）；
//! - 提供 `/static` 静态文件服务（图片/封面上传等）；
//! - 返回格式统一为 `{ code, msg, data }`，与前端 `FetchUtil` 兼容。

use std::path::PathBuf;
use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::ServeDir;

mod crypto;
mod db;
mod handlers;
mod models;
mod response;
mod server;
mod state;
mod util;

pub fn spawn(app: &tauri::AppHandle) -> anyhow::Result<()> {
    //1. 创建全局共享状态
    let (state, static_root) = state::AppState::init(app)?;
    //2. 构建后端接口路由
    let router = build_router(Arc::new(state), static_root);
    //3. 启动后端服务
    tauri::async_runtime::spawn(async move {
        if let Err(err) = server::serve(router).await {
            eprintln!("local backend start failed: {err:#}");
        }
    });

    Ok(())
}

fn build_router(state: Arc<state::AppState>, static_root: PathBuf) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .route("/api/health", get(handlers::health))
        .route("/api/crypto/public-key", get(handlers::crypto_public_key))
        .route("/api/project/create", post(handlers::project_create))
        .route("/api/project/update", post(handlers::project_update))
        .route("/api/project/pageList", post(handlers::project_page_list))
        .route(
            "/api/project/getProjectInfo/:id",
            get(handlers::project_get_info),
        )
        .route(
            "/api/project/getProjectData/:id",
            get(handlers::project_get_data),
        )
        .route("/api/project/del/:id", get(handlers::project_delete))
        .route("/api/project/copy/:id", get(handlers::project_copy))
        .route("/api/project/cover", post(handlers::project_cover))
        .route("/api/image/upload", post(handlers::image_upload))
        .route("/api/image/pageList", post(handlers::image_page_list))
        .route("/api/image/batchDelete", post(handlers::image_batch_delete))
        .route("/api/commonDatabase/list", get(handlers::common_db_list))
        .route(
            "/api/commonDatabase/pageList",
            post(handlers::common_db_page_list),
        )
        .route("/api/commonDatabase/get/:id", get(handlers::common_db_get))
        .route("/api/commonDatabase/add", post(handlers::common_db_add))
        .route(
            "/api/commonDatabase/update",
            post(handlers::common_db_update),
        )
        .route(
            "/api/commonDatabase/batchDel",
            post(handlers::common_db_batch_del),
        )
        .route(
            "/api/commonDatabase/copy/:id",
            get(handlers::common_db_copy),
        )
        .route(
            "/api/commonDatabase/test/:id",
            get(handlers::common_db_test),
        )
        .route(
            "/api/db/executor/execute",
            post(handlers::db_executor_execute),
        )
        .nest_service("/static", ServeDir::new(static_root))
        .layer(cors)
        .with_state(state)
}
