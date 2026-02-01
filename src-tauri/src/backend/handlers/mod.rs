//! HTTP API handlers（按业务域拆分）。
//!
//! 这里仅负责：
//! - 组织各业务模块（project/image/common_db/...）
//! - 对外 re-export 函数名，便于在 router 中统一挂载路由

mod common_db;
mod crypto;
mod db_executor;
mod health;
mod image;
mod project;

pub use common_db::{
    common_db_add, common_db_batch_del, common_db_copy, common_db_get, common_db_list,
    common_db_page_list, common_db_test, common_db_update,
};
pub use crypto::crypto_public_key;
pub use db_executor::db_executor_execute;
pub use health::health;
pub use image::{image_batch_delete, image_page_list, image_upload};
pub use project::{
    project_cover, project_create, project_copy, project_delete, project_get_data, project_get_info,
    project_page_list, project_update,
};
