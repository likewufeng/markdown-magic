import { createApp } from "vue";
import App from "./App.vue";

import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'

// global css
import '@/styles/index.scss'

import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'

createApp(App)
  .use(Antd)
  .component('mavon-editor',mavonEditor)
  .mount("#app");
