/*
* @Author: banana
* @Date:   2019-03-18 22:07:59
* @Last Modified by:   banana
* @Last Modified time: 2019-03-27 15:02:20
*/
var _mm = require('util/mm.js');

var _order = {
    getProductList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/getOrderCartProduct'),
            method:'POST',
            data:{
                pageSize:50
            },
            success: resolve,
            error: reject
        });
    },
    createOrder:function(orderInfo,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/order/create'),
            method:'POST',
            data:orderInfo,
            success: resolve,
            error: reject
        });
    },
    getOrderList:function(listParam,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/order/list'),
            data:listParam,
            success: resolve,
            error: reject
        });
    },
    getOrderDetail:function(orderNum,resolve,reject){
       _mm.request({
        url: _mm.getServerUrl('/order/detail'),
        method:'POST',
        data:{
            orderNo:orderNum
        },
        success: resolve,
        error: reject
     });
   },
   cancelOrder:function(orderNum,resolve,reject){
    _mm.request({
        url: _mm.getServerUrl('/order/cancelOrder'),
        method:'POST',
        data:{
            orderNo:orderNum
        },
        success: resolve,
        error: reject
    });
   },

}
module.exports = _order;