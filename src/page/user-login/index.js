/*
 * @Author: ManMan
 * @Date:   2019-01-05 21:00:33
 * @Last Modified by:   lei
 * @Last Modified time: 2019-01-28 10:14:52
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
};

var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var time = new Date().getTime();
        $('#image').attr('src','/user/verifyCode/'+time);
        var _this = this;
        $('#submit').click(function() {
            _this.submit();
        });
        $('.user-content').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });     
        $('#image').click(function() {
            var time = new Date().getTime();
            $('#image').attr('src','/user/verifyCode/'+time);
        });
    },
    submit: function() {
        var formData = {
                email: $.trim($('#username').val()),
                password: $.trim($('#password').val()),
                verifyCode:$.trim($('#code').val()),
            },
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.login(formData, function(res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show(validateResult.msg);
        }
    },
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate('require', formData.email)) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate('require', formData.password)) {
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }


};

$(function() {
    page.init();
});
