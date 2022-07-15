import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import store from './store/index.js'
import {Client, WebInfoClient} from './api/client.js'

console.info("Starting with environment", process.env.NODE_ENV);

const app = createApp(App);

app.use(router).use(store);
app.provide("$axios",Client);
let client = new WebInfoClient()
client.connect()
app.provide("client",client)

app.mount('#app');
