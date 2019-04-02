/*
* @Author: lei
* @Date:   2019-01-09 17:25:54
* @Last Modified by:   banana
* @Last Modified time: 2019-03-12 10:16:37
*/


require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
	init : function(){
		this.bindEvent();
		this.localUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent : function(){
		$('.js-login').click(function(){
			  _mm.doLogin();
		});
		$('.js-register').click(function(){
			  window.location.href= './user-register.html';
		});
		$('.js-logout').click(function(){
				_user.logout(function(res){
						window.location.reload();
				},function(errMsg){
						_mm.errorTips(errMsg);
				});
		});
	},
	localUserInfo : function(){
			_user.checkLogin(function(res){
				$('.user.not-login').hide().siblings('.user.login').show()
				.find('.username').text(res.username);
			},function(errMsg){

			});
	},
	loadCartCount : function(){
			_cart.getCartCount(function(res){
					$('.nav .cart-count').text(res || 0);
			},function(errMsg){
					$('.nav .cart-count').text(0);
			});
	}

};

module.exports = nav.init();