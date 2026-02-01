//! 本地 HTTP 服务启动与监听。

use std::net::SocketAddr;

use anyhow::Context;
use axum::Router;

pub const LOCAL_API_PORT: u16 = 14210;

pub async fn serve(router: Router) -> anyhow::Result<()> {
    let addr = SocketAddr::from(([127, 0, 0, 1], LOCAL_API_PORT));
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .with_context(|| format!("绑定端口失败: {addr}"))?;
    axum::serve(listener, router)
        .await
        .context("HTTP 服务异常退出")?;
    Ok(())
}

