const path = require('path')

function resolve (dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      extensions: ['.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true,
    proxy: {
      '/api': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}