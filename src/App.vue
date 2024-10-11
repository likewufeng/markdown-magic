<!--
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-10 14:38:28
 * @LastEditTime: 2024-10-11 10:58:01
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 
 * @FilePath: \markdown-magic\src\App.vue
 * Copyright 版权声明
-->
<template>
  <div class="app-container">
    <div class="mdWrapper">
      <div class="mdInfo">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="文件">文件</a-tab-pane>
          <a-tab-pane key="2" tab="大纲">大纲</a-tab-pane>
        </a-tabs>
      </div>
      <mavonEditor
        class="mdEditor"
        ref="mavonEditorRef"
        placeholder="请输入文档内容..."
        style="z-index:1;height:100vh;flex: 1;"
        v-model="content"
        @save="handleSave"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'

const activeKey = ref('1')

const mavonEditorRef = ref(null)

const content = ref('')
const handleSave = (value) => {
  alert(value)
}

</script>

<style scoped lang="scss">
.mdWrapper{
  width: 100%;
  height: 100vh;
  display: flex;
  .mdInfo{
    width: 300px;
    border-right: 1ox solid #aaa;
    background-color: #f1f1f1;
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
