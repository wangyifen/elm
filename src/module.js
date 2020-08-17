import routes from './router/routes'
import storeModule from './store/store-module'
import Api from './http/api/index'
import { mergeObject } from '@/utils/utils'
export default function(Vue) {
    Vue.config.productionTip = false
    if (!this.$api) {
        Vue.prototype.$api = {}
    }
    mergeObject(this.$api,Api)
    routeIndex(this.$router.options.routes,this.$router)
    this.$store.registerModule('main', storeModule)
    this.$eventBus.on('visitedAbout', () => {
        alert('用户访问了about页面。')
    })
    // this.$dynamicComponent.create(Logo)
} 
/**
 * 
 * @param {*} data 父路由数组处理  this.$router.options.routes
 */
function routeIndex(data,$router) {
    if (data && data.length) {
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == 'home') {
                index = i;
            }
        }
        if (!data[index].children) {
            data[index].children = []
        }
        const homeChildren = data[index].children;
        data[index].children = [...homeChildren,...routes];
        $router.addRoutes(data)
    } else {
        $router.$addRoutes(routes)
    }
}
