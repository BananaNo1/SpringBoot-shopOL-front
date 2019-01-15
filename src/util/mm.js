/*
* @Author: lei
* @Date:   2019-01-08 11:45:41
* @Last Modified by:   lei
* @Last Modified time: 2019-01-15 11:15:08
*/

var Hogan = require('hogan.js');	
var config = {
	serverHost : ''
}

var _mm = {
	request : function(param){
		var _this = this;
		$.ajax({
			type 		: param.method		|| 'get',
			url			: param.url			|| '',
			dataType    : param.type        || 'json',
			data        : param.data 		|| '',
			success		: function(res){
					if( 0 === res.status){
						 typeof param.success  === 'function' && param.success(res.data,res.msg);
					}else if ( 10 === res.status){
							_this.doLogin();
					}else if(  1  === res.status){
						 typeof param.error === 'function'	&& param.error(res.msg);
					}

			},
			error		:function(err){
						 typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	getServerUrl : function(path){
			return config.serverHost+path;
	},
	getUrlParam : function(name){
			var reg    = 	new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			var result =    window.location.search.substr(1).match(reg);
			return result ? decodeURIComponent(result[2]) : null;
	},
	doLogin 	:  	function(){
			window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	goHome		: 	function(){
			window.location.href = './index.html';
	},
	renderHtml : 	function(htmlTemplate,data){
			var template = Hogan.compile(htmlTemplate);
		 	result = template.render(data);
			return result;
	},
	successTips : 	function(msg){
			alert(msg || '操作成功');
	},
	errorTips   : 	function(msg){
			alert(msg || '失败');
	},
	validate 	: 	function(type,value){
		var value = $.trim(value);
		if('require' === type){
				return !!value;
		}
		if('phone'  === type){
				return /^1\d{10}$/.test(value);
		}
		if('email'  === type){
				return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	}

};

module.exports = _mm;