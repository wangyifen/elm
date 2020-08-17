const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const argv = process.argv
const isBuildModule = process.argv.indexOf('src/module.js') != -1;
module.exports = {
    outputDir: isBuildModule ? './dist/module' : './dist',
    assetsDir: './assets',
    filenameHashing: true,
    lintOnSave: process.env.NODE_ENV !== 'production',
    publicPath: argv.indexOf('build') != -1 ? '././' : '/',
    productionSourceMap: false,
    configureWebpack: config => {
        if (argv.indexOf('build') == -1) {
            config.devtool = 'source-map'
            // mutate config for production...
        }
        if (argv.indexOf('analyze') != -1) {
            config.plugins.push(new BundleAnalyzerPlugin());
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
        config.externals = getProdExternals()
    },
    // 它支持webPack-dev-server的所有选项
    devServer: {
        port: 8088, // 端口号
        https: false, // https:{type:Boolean}
        open: true //配置自动启动浏览器
        // proxy: 'https://www.baidu.com' // 配置跨域处理,只有一个代理
    },
    css: {
        sourceMap: false
    }
}

function getProdExternals() {
    return {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        'crypto-js': 'CryptoJS',
        'element-ui': 'ELEMENT',
        'vue-i18n': 'VueI18n',
        axios: 'axios'
    };
}
