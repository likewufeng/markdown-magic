/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-11 11:15:02
 * @LastEditTime: 2024-10-11 13:45:44
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description:
 * @FilePath: \markdown-magic\src-tauri\src\tray.rs
 * Copyright 版权声明
 */
use tauri::{
    menu::{Menu, MenuItem /*, Submenu */},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, Runtime,
};

pub fn create_tray<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    let show_i = MenuItem::with_id(app, "show", "显示", true, None::<&str>)?;
    let hide_i = MenuItem::with_id(app, "hide", "隐藏", true, None::<&str>)?;
    let quit_i = MenuItem::with_id(app, "quit", "退出", true, None::<&str>)?;
    // let open_file_i = MenuItem::with_id(app, "open_file", "打开文件", true, None::<&str>)?;
    // let open_dir_i = MenuItem::with_id(app, "open_dir", "打开文件夹", true, None::<&str>)?;
    // let a = Submenu::with_id_and_items(app, "File", "文件", true, &[&open_file_i, &open_dir_i])?;
    // 分割线
    // let menu = Menu::with_items(app, &[&quit_i, &show_i, &hide_i, &a])?;
    let menu = Menu::with_items(app, &[&show_i, &hide_i, &quit_i])?;

    let _ = TrayIconBuilder::with_id("tray")
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .menu_on_left_click(false)
        .on_menu_event(move |app, event| match event.id.as_ref() {
            "quit" => {
                app.exit(0);
            }
            "show" => {
                let window = app.get_webview_window("main").unwrap();
                let _ = window.show();
            }
            "hide" => {
                let window = app.get_webview_window("main").unwrap();
                let _ = window.hide();
            }
            "open_file" => {
                println!("open_file");
                use tauri_plugin_dialog::DialogExt;
                let file_path = app.dialog().file().blocking_pick_file();
                println!("{:?}", file_path)
            }
            "open_dir" => {
                println!("open_dir");
                use tauri_plugin_dialog::DialogExt;
                let file_path = app.dialog().file().blocking_pick_file();
                println!("{:?}", file_path)
            }
            // Add more events here
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
        })
        .build(app);

    Ok(())
}
