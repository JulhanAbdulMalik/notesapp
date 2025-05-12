const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
   mode: 'production',

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      clean: true,
   },

   module: {
      rules: [
         {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  targets: 'defaults',
                  presets: [['@babel/preset-env']],
               },
            },
         },
      ],
   },

   plugins: [
      new MiniCssExtractPlugin({
         filename: 'style.[contenthash].css',
      }),
   ],
});
