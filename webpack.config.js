var webpack = require('webpack');
var path    = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: { 
    app : './src/app/app.js'
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']},
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.scss$/,
        use: [
          {
            loader: "style-loader", 
          },
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
              options: {
                sourceMap: true
              }
          }
        ]
      },
      { test: /\.(woff(2)?|ttf|eot|svg|cur)(\?v=\d+\.\d+\.\d+)?$/,  use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
        }
      }]},
      { test: /\.(|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,  use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'images/'
        }
      }]}
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      hash: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    })
  ]
};
