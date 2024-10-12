/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2022-03-22 12:12:49
 * @LastEditTime: 2024-10-12 15:40:21
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 应用模块
 * @FilePath: \markdown-magic\src\store\modules\app.js
 * @Copyright 版权声明
 */

const app = {
  state: {
    directoryTree: [],
    currentFile: {
      // 文件名称
      name: '',
      // 文件类型 directory : 文件夹 file : 文件
      type: '',
      // 文件路径
      path: '',
      // 文件内容
      content: '',
      // 状态 notSaved 未保存 saved 已保存
      status: 'saved'
    },
  },
  getters: {
    // 目录树
    directoryTree (state) {
      return state.directoryTree
    },
    // 当前操作的文件
    currentFile (state) {
      return state.currentFile
    }
  },
  mutations: {
    // 设置 目录树 数据
    SET_DIRECTORY_TREE: (state, data) => {
      state.directoryTree = data
    },
    // 设置 当前操作的文件 数据
    SET_CURRENT_FILE: (state, data) => {
      const newData = JSON.parse(JSON.stringify(data))
      state.currentFile = Object.assign({}, state.currentFile, newData)
    }
  },
  actions: {
    // 设置 目录树 数据
    SetDirectoryTree: ({ commit }, data) => {
      commit('SET_DIRECTORY_TREE', data)
    },
    // 设置 当前操作的文件 数据
    SetCurrentFile: ({ commit }, data) => {
      commit('SET_CURRENT_FILE', data)
    }
  }
}

export default app
