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
// import localModule from './module'
import 'element-ui/lib/theme-chalk/index.css';
import { getApis } from '@/http/api'
Vue.use(ElementUI)
Vue.use(vueModuleLoader, { store })

// Vue.use(api)
Vue.prototype.$CryptoJS = CryptoJS;
Vue.config.productionTip = false
const app = new Vue({
    router,
    store,
    render: h => h(App)
})

let loadModule = false;
axios.get('/config/apis.json' + '?t=' + Date.parse(new Date())).then(res => {
    app.$moduleLoader(res.data).then(() => {
        loadModule = true;
        window.$onchange()
    })
})
window.$onchange = function() {
    if (loadModule === true && window.$urlNumber === 0) {
        getApis(window.$api)
        Vue.prototype.$api = window.$api
        app.$mount('#app')
    }
}

