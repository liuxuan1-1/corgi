const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

function generateHTMLWebpackPlugin() {
  return Object.keys(paths.appWebpackIndexJs).map(directoryName => {
    return new HtmlWebpackPlugin({
      inject: true,
      chunks: [directoryName], // 添加引入的js,也就是entry中的key
      filename: `${directoryName}.html`,
      template: paths.appHtml //模板地址
    })
  })
}

module.exports = {
  generateHTMLWebpackPlugin,
}