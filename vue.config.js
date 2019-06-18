const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
console.log(resolve('src'));
module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'));
    config.module
      .rule('svgIconRule')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    const svgRule = config.module.rule('svg');

    svgRule.exclude.add(resolve('src/icons'));
  },
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: [],
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/demo-core': {
        target: 'http://172.18.13.90:8080',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/demo-core': '/demo-core' // rewrite path
        }
      }
    }
  }
};
