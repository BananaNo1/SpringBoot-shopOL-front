/*
 * @Author: lei
 * @Date:   2019-01-14 16:13:41
 * @Last Modified by:   lei
 * @Last Modified time: 2019-01-25 16:59:24
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
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        $('#validate').show()
        .siblings('#info').hide();
    },
    bindEvent: function() {
        var _this = this;

        $('#email').blur(function() {
            var username = $.trim($(this).val());

            if (!username) {
                return;
            }

            _user.checkEmail(username,function(res){
                    formError.hide();
            },function(errMsg){
                    formError.show(errMsg)
            });
        });

        
        $('#send').click(function() {
            var email = $.trim($('#email').val());
            if (email == null) {
                formError.show("邮箱不能为空");
            } else {
                if (!_mm.validate('email', email)) {
                    formError.show("邮箱格式不正确");
                } else {
                    $('#send').hide();
                    $('#time').show();
                    _this.timeCount();
                    var send = {
                        email : email
                    }
                    _this.sendEmail(send);
                }
            }
        });


        $('#submit').click(function() {
            _this.submit();
        });

        $('.user-content').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function() {
        var formData = {
                // username: $.trim($('#username').val()),
                // password: $.trim($('#password').val()),
                // passwordConfirm: $.trim($('#password-confirm').val()),
                // phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                verify: $.trim($('#verify').val()),
            },

            validateResult = this.formValidate(formData);

        if (validateResult.status) {
            _user.checkVerify(formData, function(res) {
                window.location.href = './user-register-info.html?res='+encodeURIComponent(res);
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
        // if (!_mm.validate('require', formData.username)) {
        //     result.msg = "用户名不能为空";
        //     return result;
        // }
        // if (!_mm.validate('require', formData.password)) {
        //     result.msg = "密码不能为空";
        //     return result;
        // }
        // if (formData.password.length < 6) {
        //     result.msg = "密码长度小于6位";
        //     return result;
        // }
        // if (formData.password !== formData.passwordConfirm) {
        //     result.msg = "两次输入的密码不一致";
        //     return result;
        // }
        // if (!_mm.validate('phone', formData.phone)) {
        //     result.msg = '手机号格式不正确';
        //     return result;
        // }
        // 验证邮箱格式
        if (!_mm.validate('email', formData.email)) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if(!_mm.validate('require',formData.verify)){
             result.msg = '验证码不能为空';
             return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    },
    sendEmail: function(send) {
        _mm.request({
            url: _mm.getServerUrl('/sendEmail'),
            data: send,
            method  :   'POST'
        });
    },
    timeCount: function() {
        var send = $('#time');
        setTimeout(function() {
            send.css("opacity", "0.8");
        }, 1000)
        var time = 120;
        var set = setInterval(function() {
            send.val("(" + --time + ")秒后重新获取");
        }, 1000);
        setTimeout(function() {
            send.hide();
            $("#send").text('重新发送验证码');
            $('#send').show();

            clearInterval(set);
        }, 60000);
    },
    
};

$(function() {
    page.init();
});
