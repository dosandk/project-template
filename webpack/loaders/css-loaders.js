const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode =
  process.env.NODE_ENV === 'development';

const styleLoader = {
  loader: 'style-loader'
};

const MiniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader
};

module.exports = [
  // NOTE: more details here https://github.com/webpack-contrib/css-loader#recommend
  devMode
    ? { ...styleLoader }
    : { ...MiniCssExtractPluginLoader },
  {
    loader: 'css-loader'
  },
  {
    loader: 'postcss-loader'
  },
  {
    loader: 'sass-loader'
  }
];
