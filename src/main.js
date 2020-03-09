import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './style/reset.css'
import router from './router'
import store from './store'
import CryptoJS from 'crypto-js'  //DES加密
import vueModuleLoader from 'vue-module-loader'
// import api from '@/http/index.js'
import ElementUI from 'element-ui'
import localModule from './module'
import 'element-ui/lib/theme-chalk/index.css';
import getApi from '@/http/api1'
Vue.use(ElementUI)
Vue.use(vueModuleLoader, { store })
Vue.prototype.$api = getApi
// Vue.use(api)
Vue.prototype.$CryptoJS = CryptoJS;
Vue.config.productionTip = false

const app = new Vue({
    router,
    store,
    render: h => h(App)
})
app.$moduleLoader(localModule)
// app.$moduleLoader({
//     'vue-template':'http://192.168.13.251:8081/vue-template.umd.min.js'
// })
app.$mount('#app')
console.log(process.env)
