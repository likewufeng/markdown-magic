<!--
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-11 13:13:36
 * @LastEditTime: 2024-10-12 16:26:47
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 
 * @FilePath: \markdown-magic\src\components\Menu\index.vue
 * Copyright 版权声明
-->
<template>
  <div class="menuWrapper">
    <a-dropdown v-for="(item, index) in menuOptions" :key="item.key">
      <a class="ant-dropdown-link" @click.prevent>
        {{item.label}}
      </a>
      <template #overlay>
        <a-menu>
          <template v-for="(items, indexs) in item.children">
            <a-menu-item @click="handleClick(items)">
              {{items.label}}
            </a-menu-item>
            <a-menu-divider v-if="items.divider === true"/>
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, reactive, onMounted } from 'vue'

import { open, save, message } from '@tauri-apps/plugin-dialog'

import { saveFile, buildDirectoryTree, saveAsFile, openFileFn } from '@/utils/markdown.js'

const store = useStore()

const menuOptions = [
  {
    label: '文件',
    key: 'file',
    children: [
      // {
      //   label: '新建',
      //   key: 'new',
      //   divider: true
      // },
      {
        label: '打开文件',
        key: 'openFile',
      },
      {
        label: '打开文件夹',
        key: 'openFolder',
        divider: true
      },
      {
        label: '保存',
        key: 'save',
      },
      {
        label: '另存为',
        key: 'saveAs',
      }
    ]
  },
  {
    label: '帮助',
    key: 'help',
    children: [
      {
        label: '更新日志',
        key: 'updateLog',
        divider: true
      },
      {
        label: '检查更新',
        key: 'checkUpdate',
      },
      {
        label: '帮助',
        key: 'help',
      }
    ]
  }
]

onMounted(() => {
})

const handleClick = async (e) => {
  const { key } = e
  switch (key) {
    case 'new':
      /**
       * TODO: 方案1： 检测当前有未保存的文件，提示是否保存，保存后再打开新文件
       * TODO: 方案2： 直接打开窗口创建一个新的窗口
       */
      
      break;
    // 打开文件
    case 'openFile':
      openFileFn()
      break;
    // 打开文件夹
    case 'openFolder':
      const openFolderPath = await open({
        multiple: false,
        directory: true
      })
      buildDirectoryTree(openFolderPath)
      break;
    // 保存
    case'save':
      saveFile()
      break;
    // 另存为
    case'saveAs':
      const saveAsPath = await saveAsFile()
      buildDirectoryTree(saveAsPath)
      break;
  }
}
</script>

<style scoped lang="scss">
.menuWrapper{
  height: 40px;
  line-height: 40px;
  background-color: rgb(251, 251, 251);
  border-bottom: 1px solid #ddd;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 12px;
  font-size: 12px;
  .ant-dropdown-link{
    margin: 0 8px;
  }
}
</style>
