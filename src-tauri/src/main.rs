#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod backend;

fn main() {
    // 1) 创建 Tauri 应用构建器：
    // - `default()` 会加载 Tauri 的默认运行时与插件基础设施
    // - 这里返回一个 Builder，用于继续链式配置（setup/commands/windows 等）
    tauri::Builder::default()
        // 2) 注册 setup 钩子：
        // - 在 Tauri 应用真正开始运行前执行（窗口创建/事件循环启动前）
        // - 适合做“一次性初始化”：启动本地后端、初始化数据库、注册全局状态等
        .setup(|app| {
            // 3) 启动本地 Axum 后端：
            // - `app.handle()` 获取 `AppHandle`（线程安全的应用句柄），可用于取 app_data_dir 等路径
            // - `backend::spawn` 内部会异步启动本地 HTTP 服务（127.0.0.1:14210），供前端调用 /api 与 /static
            // - 这里使用 `?`，若启动失败会中断 setup 并让整个应用启动失败（避免“前端可用但后端不可用”的半残状态）
            backend::spawn(app.handle())?;

            // 4) setup 成功返回：
            // - `setup` 约定返回 `Result<(), E>`
            // - 返回 Ok 表示继续启动主程序（进入 Tauri 事件循环）
            Ok(())
        })
        // 5) 启动应用事件循环：
        // - `generate_context!()` 会从 tauri.conf.json 与编译期信息生成运行上下文（窗口、资源、权限等）
        // - `run` 会阻塞当前线程，直到应用退出
        .run(tauri::generate_context!())
        // 6) 处理 run 的错误：
        // - `run` 返回 Result；这里选择直接 panic，并给出固定错误信息
        // - 若需要更友好的用户提示，可替换成日志/对话框提示
        .expect("error while running tauri application");
}
