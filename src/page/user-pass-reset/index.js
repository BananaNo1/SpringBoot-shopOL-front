/*
 * @Author: lei
 * @Date:   2019-01-18 16:07:00
 * @Last Modified by:   lei
 * @Last Modified time: 2019-01-24 10:59:10
 */
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var formError = {
    show: function(msg) {
        $('.error-item').show().find('.err-msg').text(msg);
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    data: {
        username: '',
        token: ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    bindEvent: function() {
        var _this = this;

        $('#username').blur(function() {
            var username = $.trim($('#username').val());
            if (!username) {
                formError.show("请输入邮箱");
                return;
            } else {
                if (!_mm.validate('email', username)) {
                    formError.show("邮箱格式不正确");
                    return;
                }
            }
            _user.checkEmail(username, function(res) {
                formError.hide();
            }, function(errMsg) {
                formError.show(errMsg);
            })
        });

        $('#submit-username').click(function() {
            var msg = $.trim($('.err-msg').text());
            if (msg) {
                return;
            }
            _this.loadStepPassword();
        });

        // $('#submit-question').click(function() {
        //     var username = $.trim($('#username').val());
        //     if(username){

        //     }
        //     _this.loadStepPassword();
        // });
        $('#submit-password').click(function() {
            var formData = {
                password: $.trim($('#password').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
                verify: $.trim($('#code').val()),
                email:$.trim($('#username').val()),
            };

            var msg = $.trim($('.err-msg').text());
            if (msg || !formData.password || !formData.verify) {
                return;
            }

            _user.resetPassword(formData, function(res) {
                window.location.href = './result.html';
            }, function(errMsg) {
                formError.show(errMsg);
            });


            // if (validateResult.status) {
            //     _user.resetPassword(formData, function(res) {
            //         window.location.href = './result.html?type=reset';
            //     }, function(errMsg) {
            //         formError.show(errMsg);
            //     });
            // } else {
            //     formError.show(validateResult.msg);
            // }
        });

        $('#password-confirm').blur(function() {
            var password = $.trim($('#password').val());
            var passwordConfirm = $.trim($('#password-confirm').val());
            if (password !== passwordConfirm) {
                formError.show("两次输入的密码不一致");
            }
        });

        $('#send').click(function() {
            var email = $.trim($('#username').val());
            if (email) {
                $('#send').hide();
                $('#time').show();
                _this.timeCount();
                var send = {
                    email: email
                };
                _this.sendEmail(send);
            }
        });
    },
    loadStepUsername: function() {
        $('.step-username').show();
        $('.step-password').hide();
    },
    // loadStepEmail: function() {
    //     $('.step-username').hide()
    //         .siblings('.step-question').show()
    //         .find('.email').text(this.data.email);
    // },
    loadStepPassword: function() {
        // $('.step-password').show();
        // $('.step-username').hide();
        $('.step-username').hide()
            .siblings('.step-password').show();
    },
    sendEmail: function(send) {
        _mm.request({
            url: _mm.getServerUrl('/sendEmail'),
            data: send,
            method: 'POST'
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
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (formData.password !== formData.passwordConfirm) {
            result.msg = "两次输入的密码不一致";
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
