/*
* @Author: lei
* @Date:   2019-01-10 11:17:46
* @Last Modified by:   banana
* @Last Modified time: 2019-04-18 17:18:13
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

		// 输入会车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
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