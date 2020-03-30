import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './style/reset.css'
import './http/axios'
import router from './router'
import store from './store'
import CryptoJS from 'crypto-js'  //DES加密
import vueModuleLoader from 'vue-module-loader'
import localModule from './module'

import { Button,Message } from 'element-ui';
Vue.use(vueModuleLoader, { store })
Vue.use(Button)
Vue.prototype.$message = Message;


Vue.prototype.$CryptoJS = CryptoJS;
Vue.config.productionTip = false
const app = new Vue({
    router,
    store,
    render: h => h(App)
})

app.$moduleLoader(localModule)
app.$mount('#app')

// axios.get('/config/apis.json' + '?t=' + Date.parse(new Date())).then(res => {
//     app.$moduleLoader(res.data).then(()=>{
//         app.$mount('#app')
//     })
// })
Vue.prototype.$api = window.$apiList

