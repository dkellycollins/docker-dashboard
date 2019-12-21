const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: {
    renderer: './src/renderer/index.tsx'
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'renderer/index.html',
      template: './src/renderer/index.html',
      chunks: ['renderer'],
      inject: 'body'
    })
  ]
});
