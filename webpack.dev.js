const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
   mode: 'development',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
   },

   devServer: {
      open: true,
      port: 8080,
      hot: true,
   },

   plugins: [
      new MiniCssExtractPlugin({
         filename: 'style.css',
      }),
   ],
});
