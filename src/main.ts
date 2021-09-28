import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import Prism from 'prismjs'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

const app = createApp(App)
app.use(VueMarkdownEditor)
app.use(store)
app.use(router)
app.mount('#app')
