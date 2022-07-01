'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'mega spider' // page title
const publicPath = '/'
const outputDir = '../www'
const assetsDir = 'static'

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath,
  outputDir,
  assetsDir,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    /*使用mock解开注释*/
    // before: require('./mock/mock-server.js'),
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
      // '/api': {
        target: 'http://192.168.31.175:8765',
        changeOrigin: true,
        ws: true,
        // secure: false,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
          // '/api': ''
        }
      }
    }

  },
  configureWebpack: (config) => {
    const plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        // gzip压缩
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过4k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }),
        // 获取git提交记录
        new GitRevisionPlugin()
      )
    }
    return {
      name,
      plugins
    }
  },
  chainWebpack(config) {
    // 测量webpack构建速度
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.plugin('speed')
            .use(SpeedMeasureWebpackPlugin)
        })
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // CopyWebpackPlugin插件
    config
      .plugin('copy')
      .tap(args => {
        args[0][0].ignore.push('**/*/**')
        args[0].push({
          from: resolve('public'),
          to: resolve(`${outputDir}/${assetsDir}`),
          toType: 'dir',
          ignore: ['.jpg', '.jpeg', '.png', '.ico', 'index.html']
        })
        return args
      })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 2, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
