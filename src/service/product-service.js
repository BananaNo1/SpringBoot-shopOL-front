/*
* @Author: lei
* @Date:   2019-02-21 15:51:39
* @Last Modified by:   lei
* @Last Modified time: 2019-02-21 16:00:30
*/

var _mm = require('util/mm.js');

var _product = {

	getIndexTv :function (resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/product/indexTV'),
			success:resolve,
			error:reject
		});
	},

}
module.exports	 = _product;