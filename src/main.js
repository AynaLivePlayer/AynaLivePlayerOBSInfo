import { createApp } from 'vue/dist/vue.esm-bundler';
import './style.css'
import App from './App.vue'
import {router} from "./router/index.js";
import store from './store/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {Client, WebInfoClient} from './api/client.js'
import myComp from "./components/index.js"
console.info("Starting with environment", process.env.NODE_ENV);


const app = createApp(App);

app.use(router).use(store);
app.use(ElementPlus);

for (let name in myComp.components) {
    app.component(myComp.components[name].tmplName,myComp.components[name])
}

app.provide("$axios",Client);
let client = new WebInfoClient()
client.connect()
app.provide("client",client)

app.mount('#app');
