/*
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-11 16:39:33
 * @LastEditTime: 2024-10-12 17:32:05
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 文件操作
 * @FilePath: \markdown-magic\src\utils\fs.js
 * @Copyright 版权声明
 */
import { readDir } from '@tauri-apps/plugin-fs'

/**
 * 获取目录树
 * @param {String} path 
 * @returns Promise(Array)
 */
export const getDirectoryTree = async (path) => {
  // alert('xx' + path)
  let tree = [];
  return new Promise(async (resolve) => {
    const items = await readDir(path)
    // alert(JSON.stringify(items))
    for (let item of items) {
      let fullPath = path + '/' + item.name;
      let isDirectory = item.isDirectory
      let isFile = item.isFile
  
      if (isDirectory === true) {
        let dirTree = {
          name: item.name,
          type: 'directory',
          path: fullPath,
          children: await getDirectoryTree(fullPath)
        };
        tree.push(dirTree);
      }
      if (isFile === true) {
        let fileInfo = {
          name: item.name,
          type: 'file',
          path: fullPath
        };
        tree.push(fileInfo);
      }
    }
    resolve(tree)
  })
}
