/*
* @Author: lei
* @Date:   2019-01-15 16:41:58
* @Last Modified by:   lei
* @Last Modified time: 2019-01-25 10:41:01
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

var page = {
		init : function(){
				this.onLoad();
		},
		onLoad : function(){
			navSide.init({
				name : 'user-center'
			});
			this.loadUserInfo();
		},
		loadUserInfo : function(){
			var userHtml = '';
			_user.getUserInfo(function(res){
				userHtml = _mm.renderHtml(templateIndex,res);
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		}
};

$(function(){
	page.init();
});