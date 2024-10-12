<!--
 * @Author: WuFeng <763467339@qq.com>
 * @Date: 2024-10-10 14:38:28
 * @LastEditTime: 2024-10-12 14:56:58
 * @LastEditors: WuFeng <763467339@qq.com>
 * @Description: 
 * @FilePath: \markdown-magic\src\components\MarkdownEditor\index.vue
 * Copyright 版权声明
-->
<template>
  <mavonEditor
    class="mdEditor"
    ref="mavonEditorRef"
    placeholder="请输入文档内容..."
    style="z-index:1;height:100%;flex: 1;"
    v-model="content"
    @change="handleChange"
    @save="handleSave"
  />
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'

import { saveFile } from '@/utils/markdown.js'

import { useStore } from 'vuex'
const store = useStore()

const mavonEditorRef = ref(null)

const content = computed({
  get: () => store.getters.currentFile.content,
  set: (value) => store.dispatch('SetCurrentFile', {
    content: value
  })
})

// 值改变
const handleChange = async (value) => {
  // alert(value)
  store.dispatch('SetCurrentFile', {
    status: 'notSaved'
  })
}

// 保存
const handleSave = async (value) => {
  saveFile()
}

</script>

<style scoped lang="scss">
</style>
