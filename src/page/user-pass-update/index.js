/*
 * @Author: lei
 * @Date:   2019-01-24 11:31:43
 * @Last Modified by:   lei
 * @Last Modified time: 2019-01-30 16:23:07
 */
require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        navSide.init({
            name: 'user-pass-update'
        });
        this.loadUserInfo();
    },
    bindEvent: function() {
        var _this = this;

        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                    password: $.trim($('#password').val()),
                    passwordNew: $.trim($('#password-new').val()),
                    passwordConfirm: $.trim($('#password-confirm').val()),
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res, msg) {
                    _mm.successTips(msg);
                }, function(errMsg) {
                    // _mm.errorTips(errMsg);
                    $('.error').html(errMsg);
                });
            } else {
               // _mm.errorTips(validateResult.msg);
               $('.error').html(validateResult.msg);
            }
        });
    },
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate('require', formData.password)) {
            result.msg = '原密码不能为空';
            return result;
        }
        if(!formData.passwordNew  || formData.passwordNew.length < 6){
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }

        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    loadUserInfo: function() {

    },

};
$(function() {
    page.init();
});
