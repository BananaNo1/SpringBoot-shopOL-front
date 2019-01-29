/*
* @Author: lei
* @Date:   2019-01-10 10:05:54
* @Last Modified by:   lei
* @Last Modified time: 2019-01-29 17:30:48
*/

var _mm = require('util/mm.js');

var _user = {
		login : function(userInfo,resolve,reject){
			_mm.request({
				url		: 	_mm.getServerUrl('/user/login'),
				data	: 	userInfo,
				method  : 	'POST',
				success : 	resolve,
				error   :   reject
			});
		},
		logout : function(resolve,reject){
			_mm.request({
				url		: 	_mm.getServerUrl('/user/logout'),
				method  : 'POST',
				success : resolve,
				error   : reject
			});
		},
		// checkUsername : function(username,resolve,reject){
		// 		_mm.request({
		// 			 url  		: _mm.getServerUrl('/user/checkValid'),
		// 			 data 		: {
		// 			 		type 	 : 'username',
		// 			 		str		 :  username
		// 			 },
		// 			 method   	: 'POST',
		// 			 success 	: resolve,
		// 			 error 		: reject
		// 		});
		// },
		checkEmail   : function(email,resolve,reject){
				_mm.request({
					url 		: _mm.getServerUrl('/user/checkValid'),
					data 		: {
							type 	:'email',
							str		: email
					},
					method		: 'POST',
					success		: resolve,
					error		: reject
				});
		},
		register :  function(userInfo,resolve,reject){
			 	_mm.request({
			 		 url 		: _mm.getServerUrl('/user/register'),
			 		 data		: userInfo,
			 		 method 	: 'POST',
			 		 success 	: resolve,
			 		 error 		: reject
			 	});
		},
		resetPassword : function(formData,resolve,reject){
				_mm.request({
					url 		: 	_mm.getServerUrl('/user/resetPassword'),
					data 		: 	formData,
					method		:   'POST',
					success 	: 	resolve,
					error		: 	reject
				});
		},
		getUserInfo : function(resolve,reject){
				_mm.request({
					url  		: 	_mm.getServerUrl('/user/getInformation'),
					method  	: 	'POST',
					success 	:   resolve,
					error 		:   reject
				});
		},
		checkVerify : function(formData,resolve,reject){
				_mm.request({
					url 		: _mm.getServerUrl('/user/checkVerify'),
					method      : 'POST',
					data        : formData,
					success     : resolve,
					error 		: reject
				});
		},
		checkLogin : function(resolve,reject){
			_mm.request({
				url : _mm.getServerUrl('/user/getUserInfo'),
				method : 'POST',
				success : resolve,
				error : reject
			});
		}
		
};

module.exports = _user;