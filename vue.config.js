module.exports = {
  outputDir: '../src/main/resources/static',
  indexPath: '../static/index.html',
  devServer: {
    // proxy: 'http://localhost:8080',
    proxy: {
      '/post': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/comment': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/like': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/v1': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
};
