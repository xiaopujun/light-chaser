//! 通用工具函数（避免在 handlers 中重复样板代码）。

use anyhow::anyhow;

pub async fn run_blocking<T>(f: impl FnOnce() -> anyhow::Result<T> + Send + 'static) -> anyhow::Result<T>
where
    T: Send + 'static,
{
    tokio::task::spawn_blocking(f)
        .await
        .map_err(|e| anyhow!("spawn_blocking 失败: {e}"))?
}

