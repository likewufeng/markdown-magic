import { createApp } from "vue";
import App from "./App.vue";

// global css
import '@/styles/index.scss'

import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'

createApp(App)
  .component('mavon-editor',mavonEditor)
  .mount("#app");
