const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const path = require('path');
const fs = require('fs');
const { NAVIGATOR_FILE_NAME } = require('./configConst');

// html plugin
// mode = dev => 开发模式
// mode = prod => 生产模式
function generateDevHTMLWebpackPlugin(mode = 'dev') {
  const result = Object.keys(paths.appWebpackIndexJs).map(directoryName => {
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
  if (mode === 'dev') {
    const config = {
      inject: true,
      chunks: [NAVIGATOR_FILE_NAME], // 添加引入的js,也就是entry中的key
      filename: `${NAVIGATOR_FILE_NAME}.html`,
      template: paths.appHtml //模板地址
    }
    result.push(new HtmlWebpackPlugin(config));
  }
  return result;
}

// dev entri
function generateDevEntri() {
  const result = {};
  const dirFileName = [];
  for (let key in paths.appWebpackIndexJs) {
    if (Object.prototype.hasOwnProperty.call(paths.appWebpackIndexJs, key)) {
      result[key] = JSON.parse(JSON.stringify(paths.appWebpackIndexJs[key]));
      dirFileName.push(key);
      if (Array.isArray(result[key])) {
        result[key].splice(1, 0, require.resolve('react-dev-utils/webpackHotDevClient'));
      }
    }
  }

  // 生成导航文件目录
  fs.writeFileSync(path.resolve(paths.appSrc, `${NAVIGATOR_FILE_NAME}.json`), JSON.stringify(dirFileName));
  
  result['navigator'] = [
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    path.resolve(paths.appSrc, `${NAVIGATOR_FILE_NAME}.tsx`)
  ]
  // console.log(paths);
  return result
}


module.exports = {
  generateDevHTMLWebpackPlugin,
  generateDevEntri
}