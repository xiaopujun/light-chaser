//! API 请求/响应数据模型。
//!
//! 说明：
//! - 前端历史接口使用 camelCase 字段（如 `dataJson` / `createTime`）。
//! - 这里保持字段名不变，以降低前后端对接改动成本。

#![allow(non_snake_case)]

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct PageParam {
    pub current: i64,
    pub size: i64,
    #[serde(default)]
    pub searchValue: Option<String>,
}

#[derive(Serialize)]
pub struct PageResult<T>
where
    T: Serialize,
{
    pub records: Vec<T>,
    pub total: i64,
    pub size: i64,
    pub current: i64,
}

#[derive(Deserialize)]
pub struct ProjectCreateReq {
    #[serde(default)]
    pub name: Option<String>,
    #[serde(default)]
    pub des: Option<String>,
    #[serde(default)]
    pub dataJson: Option<String>,
    #[serde(default)]
    pub cover: Option<String>,
}

#[derive(Deserialize)]
pub struct ProjectUpdateReq {
    pub id: String,
    #[serde(default)]
    pub name: Option<String>,
    #[serde(default)]
    pub des: Option<String>,
    #[serde(default)]
    pub dataJson: Option<String>,
    #[serde(default)]
    pub cover: Option<String>,
}

#[derive(Serialize)]
pub struct ProjectInfo {
    pub id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub des: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub dataJson: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub cover: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub createTime: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updateTime: Option<String>,
}

#[derive(Serialize)]
pub struct ImageInfo {
    pub id: String,
    pub url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub createTime: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updateTime: Option<String>,
}

#[derive(Serialize)]
pub struct CommonDbInfo {
    pub id: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub r#type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub username: Option<String>,
    pub password: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub des: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub createTime: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updateTime: Option<String>,
}

#[derive(Deserialize)]
pub struct CommonDbUpsertReq {
    #[serde(default)]
    pub id: Option<String>,
    #[serde(default)]
    pub name: Option<String>,
    #[serde(default)]
    pub r#type: Option<String>,
    #[serde(default)]
    pub username: Option<String>,
    #[serde(default)]
    pub password: Option<String>,
    #[serde(default)]
    pub url: Option<String>,
    #[serde(default)]
    pub des: Option<String>,
    #[serde(default)]
    pub aesKey: Option<String>,
}

#[derive(Deserialize)]
pub struct DbExecuteReq {
    pub id: String,
    pub sql: String,
}

