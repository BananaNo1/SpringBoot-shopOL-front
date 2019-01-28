/*
* @Author: lei
* @Date:   2019-01-10 11:17:46
* @Last Modified by:   lei
* @Last Modified time: 2019-01-10 11:29:23
*/

require('./index.css');
var _mm = require('util/mm.js');

var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');

		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent :  function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
	},
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword='+keyword;
		}else{
			_mm.goHome();
		}
	}

};
header.init();