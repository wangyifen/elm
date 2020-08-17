import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './style/reset.css'
import './http/axios'
import router from './router'
import store from './store'
import CryptoJS from 'crypto-js'  //DES加密
import vueModuleLoader from 'vue-module-loader'
import ELEMENT from 'element-ui';
import '@/http/mock'
import localModule from './module'
Vue.use(ELEMENT);
Vue.use(vueModuleLoader, { store })
// Vue.prototype.$api = {};
Vue.prototype.$CryptoJS = CryptoJS;
Vue.config.productionTip = false
Vue.prototype.$Store = store
const app = new Vue({
    router,
    store,
    render: h => h(App)
})
app.$moduleLoader(localModule)
app.$mount('#app')

// console.log(store.registerModule)
// axios.get('/config/apis.json' + '?t=' + Date.parse(new Date())).then(res => {
//     app.$moduleLoader(res.data).then(() => {
//         app.$mount('#app')
//     })
// })

