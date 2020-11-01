const path = require('path');

function resolve(dir) {
  console.log(__dirname);
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: {
      '/api': {
        target: 'https://restcountries.eu/rest/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  lintOnSave: true,
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'));
  },
  publicPath: '/',
  outputDir: 'dist'
};
