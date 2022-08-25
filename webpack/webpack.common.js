require('dotenv').config({
  path: `${process.env.NODE_ENV}.env`
});

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const jsLoaders = require('./loaders/js-loaders');
const cssLoaders = require('./loaders/css-loaders');
const imageLoaders = require('./loaders/image-loaders');

module.exports = {
  target: 'web',
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    styles: path.join(
      __dirname,
      '../src/styles/global.scss'
    )
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist'),
    chunkFilename: '[name]-[id].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: imageLoaders
      },
      {
        test: /\.(css|scss)$/i,
        // The modules option enables/disables the CSS Modules specification and setup basic behaviour.
        // https://webpack.js.org/loaders/css-loader/#modules
        use: cssLoaders.map((item) => {
          const copy = { ...item };

          if (copy.loader === 'css-loader') {
            copy.options = {
              modules: true
            };
          }

          return copy;
        }),
        include: /\.module\.css$/
      },
      {
        test: /\.(css|scss)$/i,
        use: cssLoaders,
        exclude: /\.module\.css$/
      },
      {
        test: /\.js$/i,
        use: jsLoaders,
        exclude: [/(node_modules)/]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': JSON.stringify(
        process.env.BACKEND_URL
      )
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        '../src/index.html'
      )
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            '../src/assets'
          ),
          to: 'assets/[path][name][ext]',
          noErrorOnMissing: true
        }
      ]
    })
  ]
};
