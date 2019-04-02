/*
* @Author: banana
* @Date:   2019-03-19 14:14:32
* @Last Modified by:   banana
* @Last Modified time: 2019-03-21 20:32:55
*/
var _mm = require('util/mm.js');

var _address = {
    getAddressList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/list'),
            method:'POST',
            data:{
                pageSize:50
            },
            success: resolve,
            error: reject
        });
    },
    save : function(receiverInfo,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/shipping/add'),
            method:'POST',
            data:receiverInfo,
            success:resolve,
            error:reject
        });
    },
    getAddress:function(shippingId,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/shipping/select'),
            method:'POST',
            data:{
                shippingId : shippingId
            },
            success:resolve,
            error:reject
        });
    },
    update :function(receiverInfo,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/shipping/update'),
            method:'POST',
            data:receiverInfo,
            success:resolve,
            error:reject
        });
    },
    deleteAddress:function(shippingId,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/shipping/delete'),
            method:'POST',
            data:{
                shippingId : shippingId
            },
            success:resolve,
            error:reject
        });
    }
}
module.exports = _address;