const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    outputDir: 'dist',
    assetsDir: 'assets',
    filenameHashing: true,
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: false,
    transpileDependencies: [],
    productionSourceMap: false,
    crossorigin: undefined,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
            // mutate config for production...
        }
        config.plugins.push(
            new CopyWebpackPlugin([
                {
                    from: './static', // 新增可以被index.html访问的静态文件目录,支持多个
                    to: this.outputDir,
                    ignore: ['.*']
                }
            ])
        )
    },
    // 它支持webPack-dev-server的所有选项
    devServer: {
        host: '192.168.13.251',
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:9000' // 配置跨域处理,只有一个代理

        // 配置多个代理
        proxy: {
            '/api': {
                target: '<url>',//目标主机 
                ws: true,//代理的WebSockets  
                changeOrigin: true//需要虚拟主机站点 
            },
            '/api2': {
                target: '<other_url>'
            }
        }
    }
}
