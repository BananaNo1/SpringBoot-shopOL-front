/*
* @Author: lei
* @Date:   2019-01-25 11:05:35
* @Last Modified by:   banana
* @Last Modified time: 2019-03-17 11:47:24
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var   navSide    =  require('page/common/nav-side/index.js');
var   _mm		 =  require('util/mm.js');
var _user        =  require('service/user-service.js');
var  templateIndex = require('./index.string');

var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;

		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone 	: 	$.trim($('#phone').val()),
				username   :   $.trim($('#username').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res,msg){
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
			var  userHtml = '';
			_user.getUserInfo(function(res){
				userHtml = _mm.renderHtml(templateIndex,res);
				$('.panel-body').html(userHtml);
			},function(errMsg){
				 _mm.errorTips(errMsg);
			});
	},
	validateForm : function(formData){
		  var result = {
		  		status  : false,
		  		msg 	: ''
		  };
		  if(!_mm.validate('phone',formData.phone)){
		  		result.msg='手机号格式不正确';
		  		return result;
		  }
		  // if(!_mm.validate('email',formData.email)){
		  // 		result.msg='邮箱格式不正确';
		  // 		return result;
		  // }
		  result.status = true;
		  result.msg = '验证通过';
		  return result;
	}
};
$(function(){
	page.init();
});