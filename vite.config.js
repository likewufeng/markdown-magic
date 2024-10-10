/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-10 14:38:28
 * @LastEditTime: 2024-10-10 14:57:30
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 
 * @FilePath: \markdown-magic\vite.config.js
 * @Copyright 版权声明
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1420,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
