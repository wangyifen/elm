// import Logo from './components/Logo.vue'
import routes from './router/routes'
import storeModule from './store/store-module'
export default function(Vue) {
    Vue.config.productionTip = false
    this.$router.options.routes[3].children = routes
    this.$router.addRoutes([...this.$router.options.routes])
    this.$store.registerModule('main', storeModule)
    this.$eventBus.on('visitedAbout', () => {
        alert('用户访问了about页面。')
    })
    // this.$dynamicComponent.create(Logo)
}
