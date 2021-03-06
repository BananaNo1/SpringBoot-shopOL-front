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
      'user-center'   : ['./src/page/user-center/index.js'],
      'user-pass-reset':['./src/page/user-pass-reset/index.js'],
      'user-pass-update':['./src/page/user-pass-update/index.js'],
      'user-center-update':['./src/page/user-center-update/index.js'],
      'user-register-info':['./src/page/user-register-info/index.js'],
      'validate-code' : ['./src/page/validate-code/index.js'],
      'detail':['./src/page/detail/index.js'],
      'list':['./src/page/list/index.js'],
      'cart':['./src/page/cart/index.js'],
      'order-confirm':['./src/page/order-confirm/index.js'],
      'order-list':['./src/page/order-list/index.js'],
      'order-detail':['./src/page/order-detail/index.js'],
      'payment':['./src/page/payment/index.js'],
      'about':['./src/page/about/index.js'],
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
              { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=/resource/[name].[ext]' },
              { test: /\.string$/, loader: 'html-loader'},
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
              new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
              new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
              new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
              new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
              new HtmlWebpackPlugin(getHtmlConfig('validate-code','验证')),
              new HtmlWebpackPlugin(getHtmlConfig('user-register-info','注册用户信息')),
              new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
              new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
              new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
              new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
              new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
              new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
              new HtmlWebpackPlugin(getHtmlConfig('payment','支付')),
              new HtmlWebpackPlugin(getHtmlConfig('about','关于商城')),
    ],
    optimization: {
            splitChunks : {
              cacheGroups : {
                commons :   {
                  name : 'common',
                  chunks : 'initial',
                  minChunks : 2,
              },
              // styles: 
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

