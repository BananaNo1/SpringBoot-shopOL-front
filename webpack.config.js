const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');

var WEBPACK_ENV            = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name,title){
    return {
      template  : './src/view/'+name+'.html',
      filename  : 'view/'+name+'.html',
      title     :   title,
      inject    :   true,
      hash      :   true,
      chunks    :   ['common',name]
    };
};

var config = {
    mode: "development",
    entry: {
      'common'        : ['./src/page/common/index.js'],
      'index'         : ['./src/page/index/index.js'],
      'user-login'    : ['./src/page/user-login/index.js'],
      'result'        : ['./src/page/result/index.js'],
      'user-register' : ['./src/page/user-register/index.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath : '/dist',
      filename: 'js/[name].js'
    },
    externals :{
      'jquery' : 'window.jQuery'
    },
    resolve : {                     
      alias :  {
          node_modules    :   path.resolve(__dirname,'node_modules'),
          util            :   path.resolve(__dirname,'src/util'),
          page            :   path.resolve(__dirname,'src/page'),
          service         :   path.resolve(__dirname,'src/service'),
          image           :   path.resolve(__dirname,'src/image'),
        }
    },
    module : {
      rules: [
              {
                  test: /\.css$/,
                  use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
              })
              },
              { test: /\.string$/, loader: 'html-loader'},
              { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            /* {
                  test: /\.css$/,
                  　　     use: [
                  {
                   loader: MiniCssExtractPlugin.loader,
                 },
                 'css-loader',
                 ],
               }*/
              ]
    },
    plugins : [
              new ExtractTextPlugin("css/[name].css"),
             // new MiniCssExtractPlugin({filename: "css/[name].css"}),
              new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
              new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
              new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
              new HtmlWebpackPlugin(getHtmlConfig('user-register','账号注册')),
           
    ],
    optimization: {
            splitChunks : {
              cacheGroups : {
                commons :   {
                  name : 'common',
                  chunks : 'initial',
                  minChunks : 2,
              },
              // styles: {
              //   name: styles,
              //   test: /\.(scss|css)$/,
              //   chunks: 'all',
              //   minChunks: 1,
              //   reuseExistingChunk: true,
              //   enforce: true
              // }
          }
      }
    }
          
};

module.exports = config;

