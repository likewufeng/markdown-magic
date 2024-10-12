<!--
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-10 14:38:28
 * @LastEditTime: 2024-10-12 12:31:47
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 
 * @FilePath: \markdown-magic\src\App.vue
 * Copyright 版权声明
-->
<template>
  <div class="app-container">
    <Menu></Menu>
    <div class="mdWrapper">
      <div class="mdInfo">
        <a-tabs v-model:activeKey="activeTabKey">
          <a-tab-pane key="1" tab="文件">
            <DirectoryTree></DirectoryTree>
          </a-tab-pane>
          <!-- <a-tab-pane key="2" tab="大纲">大纲</a-tab-pane> -->
        </a-tabs>
      </div>
      <!-- <mavonEditor
        class="mdEditor"
        ref="mavonEditorRef"
        placeholder="请输入文档内容..."
        style="z-index:1;height:100%;flex: 1;"
        v-model="content"
        @save="handleSave"
      /> -->
      <MarkdownEditor></MarkdownEditor>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'

import { open, save } from '@tauri-apps/plugin-dialog'

import Menu from './components/Menu/index.vue'

import DirectoryTree from './components/ToolPanel/DirectoryTree.vue'

import MarkdownEditor from './components/MarkdownEditor/index.vue'

const activeTabKey = ref('1')

</script>

<style scoped lang="scss">
.app-container{
  padding-top: 40px;
}
.mdWrapper{
  // width: 100%;
  // height: calc(100vh - 40px);
  position: fixed;
  top: 40px;
  right: 0;
  bottom: 0;
  left:0;
  display: flex;
  .mdInfo{
    width: 300px;
    border-right: 1ox solid #aaa;
    background-color: rgb(251, 251, 251);
    :deep(.ant-tabs-nav-wrap){
      .ant-tabs-nav-list{
        flex: 1;
        .ant-tabs-tab{
          flex: 1;
          display: block;
          text-align: center;
        }
      }
    }
  }
}
</style>
