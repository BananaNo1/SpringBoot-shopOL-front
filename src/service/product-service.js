/*
 * @Author: lei
 * @Date:   2019-02-21 15:51:39
 * @Last Modified by:   banana
 * @Last Modified time: 2019-03-10 19:53:30
 */

var _mm = require('util/mm.js');

var _product = {

    getIndexTv: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/indexTV'),
            success: resolve,
            error: reject
        });
    },
    getIndexBook: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/indexBook'),
            success: resolve,
            error: reject
        });
    },
    getIndexLipstick: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/indexLipstick'),
            success: resolve,
            error: reject
        });
    },
    getProductDetail: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    getProductList : function(listParam,resolve,reject){
        _mm.request({
            url :   _mm.getServerUrl('/product/list'),
            data:   listParam,
            success:resolve,
            error:  reject
        });
    }

}
module.exports = _product;
