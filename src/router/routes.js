export default [
    {
        path: '/abouts',
        name: 'abouts',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/demo.vue')
    }
]
