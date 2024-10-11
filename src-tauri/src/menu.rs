use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn init(context: &Context<EmbeddedAssets>) -> Menu {
    // 获取应用名称
    let name = &context.package_info().name;
    tauri::Menu::os_default(name)
}
