/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2022-03-22 12:12:49
 * @LastEditTime: 2024-10-11 17:57:40
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: vuex 入口文件
 * @FilePath: \markdown-magic\src\store\index.js
 * @Copyright 版权声明
 */
import { createStore } from 'vuex'
import app from './modules/app.js'

export default createStore({
  modules: {
    app
  }
})

