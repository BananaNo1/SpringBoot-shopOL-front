/*
* @Author: lei
* @Date:   2019-01-10 13:55:34
* @Last Modified by:   banana
* @Last Modified time: 2019-03-16 11:06:13
*/


var _mm = require('util/mm.js');

var _cart = {
    getCartList : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/list'),
            method : 'POST',
            success:resolve,
            error:reject
        });
    },
    getCartCount:function(resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/getCartProductCount'),
            method:'POST',
            success:resolve,
            error:reject
        });
    },
    addToCart:function(productInfo,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/addCart'),
            method:'POST',
            data:productInfo,
            success:resolve,
            error:reject
        });
    },
    updateProduct:function(productInfo,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/updateProduct'),
            method:'POST',
            data :productInfo,
            success:resolve,
            error:reject
        });
    },
    selectProduct:function(productId,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/select'),
            method:'POST',
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        });
    },
    unselectProduct:function(productId,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/unSelect'),
            method:'POST',
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        });
    },
    selectAllProduct:function(resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/selectAll'),
            method:'POST',
            success:resolve,
            error:reject
        });
    },
    unselectAllProduct:function(resolve,reject){
         _mm.request({
            url:_mm.getServerUrl('/cart/unSelectAll'),
            method:'POST',
            success:resolve,
            error:reject
        });
    },
    deleteProduct:function(productIds,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/deleteProduct'),
            method:'POST',
            data:{
                productIds : productIds
            },
            success:resolve,
            error:reject
        });
    }
};

module.exports = _cart;