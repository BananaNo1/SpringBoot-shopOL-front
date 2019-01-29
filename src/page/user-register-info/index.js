/*
* @Author: lei
* @Date:   2019-01-25 14:48:53
* @Last Modified by:   lei
* @Last Modified time: 2019-01-28 10:06:05
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
}

var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		_this = this;
		var email = _mm.getUrlParam('res');
		$('#submit').click(function() {
            _this.submit(email);
        });

	},
	submit : function(email){
		var userInfo = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
			passwordConfirm:$.trim($('#password-confirm').val()),
			phone   : $.trim($('#phone').val()),
		},
		validataResult = _this.validataForm(userInfo);
		userInfo.email = email;
		if(validataResult.status){
				_user.register(userInfo,function(res){
					window.location.href = './result.html?type=register';
				},function(errMsg){
					formError.show(errMsg);
				});
		}else{	
			_mm.errorTips(validataResult.msg);
		}
		
	},
	validataForm : function(userInfo){
		var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate('require',userInfo.username)){
        	result.msg = '用户昵称不能为空';
        	return result;
        }
        if(!_mm.validate('require',userInfo.password)){
        	result.msg = '密码不能为空';
        	return result;
        }
        if(userInfo.password.length < 6){
        	result.msg = '密码长度不能小于6位' 
        }
        if(userInfo.password!==userInfo.passwordConfirm){
        	result.msg='两次输入的密码不一致';
        	return result;
        }	
        if(!_mm.validate('phone',userInfo.phone)){
        	result.msg = '手机号码格式不正确';
        	return result;
        }
        result.msg='校验成功';
        result.status = true;
        return result;
	}	
};

$(function() {
    page.init();
});