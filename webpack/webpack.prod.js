const path = require('path');
const glob = require('glob');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const TerserPlugin = require('terser-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ]
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(
        path.join(__dirname, '../src/**/*.js'),
        { nodir: true }
      )
    })
  ]
});
