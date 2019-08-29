const path = require('path')

function resolve (dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      extensions: ['.css']
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true,
    proxy: {
      '/api': {
        // target: 'http://sit.xxx.com',
        target: 'http://api.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq(proxyReq) { // 访问生产环境
          proxyReq.setHeader('Cookie', 'authId=sicvgghhh;token=dghhh;')
        }
      }
    }
  }
}
