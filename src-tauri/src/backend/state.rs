//! Axum handlers 共享状态。
//!
//! 该结构负责承载：
//! - 应用数据目录（app_data_dir）
//! - 内置 SQLite 数据库路径
//! - 静态文件根目录（/static）
//! - RSA 私钥（用于解密前端传来的密文）
//! - RSA 公钥 PEM（供前端拉取，用于加密）

use std::path::PathBuf;
use std::sync::Arc;

use anyhow::Context;
use rsa::RsaPrivateKey;
use tauri::Manager;

use super::{crypto, db};

#[derive(Clone)]
pub struct AppState {
    pub app_data_dir: PathBuf,
    pub app_db_path: PathBuf,
    pub static_root: PathBuf,
    pub rsa_private_key: Arc<RsaPrivateKey>,
    pub rsa_public_key_pem: Arc<String>,
}

impl AppState {
    pub fn init(app: &tauri::AppHandle) -> anyhow::Result<(Self, PathBuf)> {
        let app_data_dir: PathBuf = app
            .path()
            .app_data_dir()
            .context("获取 app_data_dir 失败")?;
        std::fs::create_dir_all(&app_data_dir).context("创建 app_data_dir 失败")?;

        let app_db_path: PathBuf = app_data_dir.join("light-chaser.sqlite3");
        db::init_app_db(app_db_path.as_path())?;

        let static_root: PathBuf = app_data_dir.join("static");
        std::fs::create_dir_all(static_root.join("uploads")).context("创建 static/uploads 失败")?;

        let (rsa_private_key, rsa_public_key_pem) =
            crypto::init_or_load_rsa_keys(app_data_dir.as_path())?;

        let state = Self {
            app_data_dir,
            app_db_path,
            static_root: static_root.clone(),
            rsa_private_key: Arc::new(rsa_private_key),
            rsa_public_key_pem: Arc::new(rsa_public_key_pem),
        };

        Ok((state, static_root))
    }
}
