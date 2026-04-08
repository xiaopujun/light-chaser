# LIGHT CHASER SERVER

LIGHT CHASER 数据可视化编辑器后端基础开源版

- Java 17
- SpringBoot 3.2.5
- Mybatis Plus 3.5.5
- SQLite 数据库（开箱即用）

## 快速开始

1. clone项目
```bash
git clone https://github.com/xiaopujun/light-chaser-server.git
```
2. 运行项目（自动创建SQLite数据库）

```bash
mvn spring-boot:run
```

项目启动后会自动：
- 创建SQLite数据库文件（`./data/light_chaser_server.db`）
- 执行数据库初始化脚本
- 在`./data/resources`目录下存储上传的资源文件

## 数据库说明

项目默认使用SQLite数据库，具有以下优势：
- 无需安装数据库服务器
- 开箱即用，自动创建数据库文件
- 轻量级，适合开发和小型部署
- 数据库文件位于：`./data/light_chaser_server.db`

## 配置说明

如需修改数据库路径或其他配置，可在application.yml中调整：

```yaml
spring:
  datasource:
    url: jdbc:sqlite:./data/light_chaser_server.db  # SQLite数据库文件路径

light-chaser:
  project-resource-path: ./data/resources  # 项目资源路径
  source-image-path: /static/images/       # 项目图片组件上传路径
  cover-path: /static/covers/              # 项目封面路径
  migration:                               # 是否自动运行数据库迁移脚本
    enable: true
```
