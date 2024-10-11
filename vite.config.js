/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-10 14:38:28
 * @LastEditTime: 2024-10-10 16:31:47
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 
 * @FilePath: \markdown-magic\vite.config.js
 * @Copyright 版权声明
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    // Components({
    //   resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    // }),
  ],

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
