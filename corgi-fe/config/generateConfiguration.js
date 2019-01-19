const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

// html plugin
function generateDevHTMLWebpackPlugin(mode = 'dev') {
  return Object.keys(paths.appWebpackIndexJs).map(directoryName => {
    const config = {
      inject: true,
      chunks: [directoryName], // 添加引入的js,也就是entry中的key
      filename: `${directoryName}.html`,
      template: paths.appHtml //模板地址
    };

    if (mode === 'prod') {
      config.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }
    return new HtmlWebpackPlugin(config)
  })
}

// dev entri
function generateDevEntri() {
  const result = {}
  for (let key in paths.appWebpackIndexJs) {
    if (Object.prototype.hasOwnProperty.call(paths.appWebpackIndexJs, key)) {
      result[key] = JSON.parse(JSON.stringify(paths.appWebpackIndexJs[key]));
      if (Array.isArray(result[key])) {
        result[key].splice(1, 0, require.resolve('react-dev-utils/webpackHotDevClient'));
      }
    }
  }
  return result
}


module.exports = {
  generateDevHTMLWebpackPlugin,
  generateDevEntri
}