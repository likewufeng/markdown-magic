/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-12 10:56:20
 * @LastEditTime: 2024-10-12 17:28:03
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: markdown文件操作
 * @FilePath: \markdown-magic\src\utils\markdown.js
 * @Copyright 版权声明
 */

import { open as openDialog, save as saveDialog, message as messageDialog } from '@tauri-apps/plugin-dialog'

import { message as messageAnt } from 'ant-design-vue'

import { open, exists, readFile } from '@tauri-apps/plugin-fs'

import store from '@/store'

import { getDirectoryTree } from '@/utils/fs.js'

import { nextTick  } from 'vue'

function getDirectoryPath(filePath) {
  // 查找最后一个路径分隔符的位置
  let lastSeparatorIndex = Math.max(filePath.lastIndexOf('\\'), filePath.lastIndexOf('/'))
  // 截取路径到文件夹
  let directoryPath = filePath.substring(0, lastSeparatorIndex)
  return directoryPath
}

/**
 * 构造目录树
 * @param {String} path 目录路径
 * @returns Promise(Array)
 */
export const buildDirectoryTree = (path) => {
  // alert('path==========' + path)
  // alert('=='+path)
  return new Promise(async (resolve, reject) => {
    try {
      const directoryTreeData = await getDirectoryTree(path)
      // alert('directoryTreeData' + JSON.stringify(directoryTreeData))
      store.dispatch('SetDirectoryTree', directoryTreeData)
      resolve(directoryTreeData)
    } catch (error) {
      // alert(error)
      reject(error)
    }
  })
}

/**
 * 创建文件
 * @param {String} filePath
 * @returns
 */
export const createFile = (filePath) => {
  return new Promise((resolve) => {
    resolve('')
  })
}

/**
 * 保存文件
 * @param {String} filePath
 * @param {String} content 
 * @returns 
 */
export const saveFile = async (content) => {
  const fileContent = content??(store.getters.currentFile?.content??'')
  // alert('=='+fileContent)
  return new Promise(async (resolve) => {
    const filePath = store.getters.currentFile?.path??''
    if (filePath === '' || await exists(filePath) === false) {
      const savePath = await saveDialog({
        filters: [
          {
            name: 'Markdown文档',
            extensions: ['md', 'markdown', 'mmd', 'mdwn', 'mdown']
          }
        ]
      })
      try {
        const saveResult = await open(savePath, { read: true, write: true, truncate: true, create: true })
        const result = await saveResult.write(new TextEncoder().encode(fileContent))
        store.dispatch('SetCurrentFile', {
          path: savePath,
          status: 'saved'
        })
        const openPath = getDirectoryPath(savePath)
        // await buildDirectoryTree(openPath)
        // await messageDialog('保存成功' + savePath, { title: '提示', kind:'success' })
        messageAnt.success('保存成功')
      } catch (error) {
        // await messageDialog('无文件操作权限', { title: '提示', kind: 'error' })
      }
    } else {
      try {
        const saveResult = await open(filePath, { read: true, write: true, truncate: true, create: true })
        const result = await saveResult.write(new TextEncoder().encode(fileContent))
        store.dispatch('SetCurrentFile', {
          status: 'saved'
        })
        const openPath = getDirectoryPath(filePath)
        // await buildDirectoryTree(openPath)
        // await messageDialog('保存成功' + filePath, { title: '提示', kind:'success' })
        messageAnt.success('保存成功')
      } catch (error) {
        // await messageDialog('无文件操作权限', { title: '提示', kind: 'error' })
      }
    }
    resolve(fileContent)
  })
}

/**
 * 获取文件内容
 * @param {String} filePath
 * @returns
 */
export const getFileContent = (filePath) => {
  return new Promise(async (resolve) => {
    const isExist = await exists(filePath)
    if (isExist === true) {
      const fileData = await readFile(filePath)
      const data = new TextDecoder().decode(fileData)
      resolve(data)
    } else {
      resolve('')
    }
  })
}

/**
 * 另存为文件
 * @param {String} filePath
 * @param {String} content
 * @returns
 */
export const saveAsFile = (filePath, content) => {
  return new Promise(async (resolve) => {
    const fileContent = content??(store.getters.currentFile?.content??'')
    const saveAsPath = await saveDialog({
      filters: [
        {
          name: 'Markdown文档',
          extensions: ['md', 'markdown', 'mmd', 'mdwn', 'mdown']
        }
      ]
    })
    try {
      const saveResult = await open(saveAsPath, { read: true, write: true, truncate: true, create: true })
      const result = await saveResult.write(new TextEncoder().encode(fileContent))
    } catch (error) {
    }
    resolve(saveAsPath)
  })
}


/**
 * 打开文件
 * @returns
 */
export const openFileFn = async () => {
  const openFilePath = await openDialog({
    multiple: false,
    directory: false,
    extensions: ['md', 'markdown', 'mmd', 'mdwn', 'mdown']
  })
  const fileContent = await getFileContent(openFilePath)
  await store.dispatch('SetCurrentFile', {
    path: openFilePath,
    content: fileContent,
    type: 'file',
    status: 'saved'
  })
  const openPath = getDirectoryPath(openFilePath)
  // alert('openPath--------------------------' + openPath)
  const tree = await buildDirectoryTree(openPath)
  // alert('tree---' + JSON.stringify(tree))
}