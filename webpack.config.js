const path = require('path');
var webpack = require('webpack');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');

var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name){
  return {
    template  : './src/view/'+name+'.html',
    filename: 'view/'+name+'.html',
    inject:   true,
    hash:     true,
    chunks:   ['common',name]
  };
};

var config = {
  mode: "development",
  entry: {
    'common' : ['./src/page/common/index.js'],
    'index' : ['./src/page/index/index.js'],
    'login' : ['./src/page/login/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath : '/dist',
    filename: 'js/[name].js'
  },
  externals :{
    'jquery' : 'window.jQuery'
  },
  module : {
    rules: [
    {
                // test: /\.css$/,
                //  use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //      use: "css-loader"
                //     })
                test: /\.css$/,
                　　     use: [
                {
                 loader: MiniCssExtractPlugin.loader,
               },
               'css-loader',
               ],
             }
             ]
           },
           plugins : [
         // new ExtractTextPlugin({ 
         //        filename : 'css/[name].css'
         // })
         new MiniCssExtractPlugin({
          　　    filename: "css/[name].css"
        　　   }),
         new HtmlWebpackPlugin({
          template: './src/view/index.html',
          filename: 'view/index.html',
          inject:   true,
          hash:     true,
          chunks:   ['common','index']
        })
         ],
         optimization: {
          splitChunks : {
            cacheGroups : {
              commons :   {
                name : 'common',
                chunks : 'initial',
                minChunks : 2
              }
            }
          }
        }
        
      };

      module.exports = config;

