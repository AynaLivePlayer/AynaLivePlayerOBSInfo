import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/base.css'
import {setupFontAwesome} from "@/plugins/fontawesome";


const app = createApp(App)

setupFontAwesome(app);

app.use(createPinia())
app.use(router)

app.mount('#app')
