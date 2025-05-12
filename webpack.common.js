const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: './src/script/index.js',

   module: {
      rules: [
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
         },
      ],
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html',
      }),
   ],
};
