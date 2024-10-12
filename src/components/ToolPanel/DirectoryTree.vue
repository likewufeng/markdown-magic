<!--
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-12 09:54:55
 * @LastEditTime: 2024-10-12 17:28:21
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 
 * @FilePath: \markdown-magic\src\components\ToolPanel\DirectoryTree.vue
 * Copyright 版权声明
-->
<template>
  <div class="directoryTreeWrapper">
    <a-tree 
      :tree-data="$store.getters['directoryTree']" 
      :show-line="true" 
      show-icon 
      default-expand-all 
      v-model:selectedKeys="selectedKeys"
      :replaceFields="{ title: 'name', key: 'path' }"
      @select="handleClick"
    >
    </a-tree>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, reactive, watch, nextTick } from 'vue'

import { confirm as confirmDialog } from '@tauri-apps/plugin-dialog'

import {
  DownOutlined
} from '@ant-design/icons-vue'

import { getFileContent, saveFile } from '@/utils/markdown.js'

const store = useStore()

const selectedKeys = ref([])

const selectedData = ref({})

// 监听选中的文件
watch(selectedKeys, async (newValue, oldValue) => {
  // // alert(`new: ${newValue}, old: ${oldValue}`)
  // const fileType = selectedData.value?.node?.dataRef?.type??''
  // const filePath = selectedData.value?.node?.dataRef?.path??''
  // if (fileType === 'file') {
  //   if (store.getters.currentFile.status === 'notSaved') {
  //     const confirmation = await confirm(
  //       '当前文件还未保存，是否需要保存？',
  //       { title: '提示', kind: 'warning' }
  //     )
  //     if (confirmation === true) {
  //       await saveFile()
  //       const fileContent = await getFileContent(filePath)
  //       store.dispatch('SetCurrentFile', {
  //         path: filePath,
  //         content: fileContent,
  //         status:'saved'
  //       })
  //       selectedKeys.value = [filePath]
  //     } else {
  //       alert('取消')
  //       selectedKeys.value = [oldValue]
  //     }
  //   } else {
  //     const fileContent = await getFileContent(filePath)
  //     store.dispatch('SetCurrentFile', {
  //       path: filePath,
  //       content: fileContent,
  //       status:'saved'
  //     })
  //     selectedKeys.value = [filePath]
  //   }
  // }
})

const handleClick = async (chekcedKeys, e) => {
  selectedData.value = e
  const fileType = selectedData.value?.node?.dataRef?.type??''
  const filePath = selectedData.value?.node?.dataRef?.path??''
  if (fileType === 'file') {
    if (store.getters.currentFile.status === 'notSaved') {
      const confirmation = await confirm(
        '当前文件还未保存，是否需要保存？',
        { title: '提示', kind: 'warning' }
      )
      if (confirmation === true) {
        await saveFile()
        const fileContent = await getFileContent(filePath)
        store.dispatch('SetCurrentFile', {
          path: filePath,
          content: fileContent,
          status:'saved'
        })
        nextTick(() => {
          store.dispatch('SetCurrentFile', {
            status: 'saved'
          })
        })
        selectedKeys.value = [filePath]
      } else {
        // alert('取消')
        selectedKeys.value = [oldValue]
      }
    } else {
      const fileContent = await getFileContent(filePath)
      store.dispatch('SetCurrentFile', {
        path: filePath,
        content: fileContent,
        status:'saved'
      })
      nextTick(() => {
        store.dispatch('SetCurrentFile', {
          status: 'saved'
        })
      })
      selectedKeys.value = [filePath]
    }
  }
}

</script>

<style scoped lang="scss">
.directoryTreeWrapper{
  padding: 0 20px 20px;
  overflow: auto;
  height: calc(100vh - 102px);
}
</style>