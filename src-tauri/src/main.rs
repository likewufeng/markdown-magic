/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-10 14:38:28
 * @LastEditTime: 2024-10-11 09:43:02
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description:
 * @FilePath: \markdown-magic\src-tauri\src\main.rs
 * Copyright 版权声明
 */
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    markdown_magic_lib::run()
}
