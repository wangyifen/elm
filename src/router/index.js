import Vue from 'vue'
import VueRouter from 'vue-router'
// noinspection JSAnnotator
const _import = require('./_import_' + process.env.NODE_ENV)

const globalRoutes = [
    // { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
    {
        path: '/',
        redirect: '/login'
    },
    { path: '/login', component: _import('/Login/Login'), name: 'login', meta: { title: '登录' } },
    { path: '/forget', component: _import('/Forget/Forget'), name: 'forget', meta: { title: '忘记密码' } }
]

// 主入口路由(需嵌套上左右整体布局)

const mainRoutes = {
    path: '/home',
    component: _import('/Home'),
    children: [
        { path: '/firstpage', component: _import('/Firstpage/Firstpage'), name: 'firstpage', meta: { title: '首页', isLogin: true } }
    ],
    beforeEnter (to, from, next) {
        next()
    }
}
const router = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
})
// router.beforeEach((to, from, next) => {
//     if (router.options.isAddDynamicMenuRoutes || (fnCurrentRouteType(to, globalRoutes) === 'global' && !to.meta.isLogin)) {
//         next()
//     } else {
//         let a = localStorage.getItem('ModualTree')
//         if (a) {
//             a = JSON.parse(a)
//             const arr = []
//             for (let i = 0; i < a.length; i++) {
//                 arr.push(getLeafCountTree(a[i]))
//             }

//             arr.splice(0, 1)
//             mainRoutes.children = [...arr, ...mainRoutes.children]
//             router.addRoutes([
//                 mainRoutes
//             ])
//             console.log(mainRoutes)
//             router.options.isAddDynamicMenuRoutes = true
//             next({ ...to, replace: true })
//         }
//     }
// })
/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
// function fnCurrentRouteType (route, globalRoutes = []) {
//     var temp = []
//     for (var i = 0; i < globalRoutes.length; i++) {
//         if (route.path === globalRoutes[i].path) {
//             return 'global'
//         } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
//             temp = temp.concat(globalRoutes[i].children)
//         }
//     }
//     return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
// }
Vue.use(VueRouter)

export default router

/**
 * 获取 节点的所有 叶子节点 个数
 * @param {Object} json Object对象
 */
// function getLeafCountTree (json) {
//     if (json.Url && json.Url.indexOf('/') !== -1) {
//         const names = json.Url.split('/')
//         const name = names[names.length - 1]
//         const route = {
//             path: json.Url,
//             component: null, // ||_import(json.Url)
//             name: name,
//             meta: { title: json.ModuleName }
//         }
//         if (json.Url == '/about') {
//             route.component = _import(json.Url)
//         }
//         return route
//     }
//     if (!json.Children) {
//     } else {
//         for (var i = 0; i < json.Children.length; i++) {
//             var a = getLeafCountTree(json.Children[i])
//         }
//         return a
//     }
// }
