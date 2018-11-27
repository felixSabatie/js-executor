const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(webpack)
    ]
  }
}
