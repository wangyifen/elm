// import Logo from './components/Logo.vue'
import routes from './router/routes'
import storeModule from './store/store-module'
import Router from 'vue-router'
const createRouter = () => new Router({
    mode: 'hash',
    routes: []
})
export default function(Vue) {
    Vue.config.productionTip = false
    this.$router.options.routes[3].children = routes
    const routerArray = this.$router.options.routes
    const newRouter = createRouter()
    this.$router.matcher = newRouter.matcher
    this.$router.addRoutes([...routerArray])
    this.$store.registerModule('main', storeModule)
    this.$eventBus.on('visitedAbout', () => {
        alert('用户访问了about页面。')
    })
    // this.$dynamicComponent.create(Logo)
}
