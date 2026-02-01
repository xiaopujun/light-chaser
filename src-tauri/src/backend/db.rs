//! 应用内置 SQLite 初始化与基础能力。

use std::path::Path;

use anyhow::Context;
use rusqlite::Connection;

pub fn init_app_db(db_path: &Path) -> anyhow::Result<()> {
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

