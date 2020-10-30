const path = require('path');

function resolve(dir) {
  console.log(__dirname);
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {},
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'));

    config
      .plugin('context')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/]);
  },
  publicPath: ''
};
