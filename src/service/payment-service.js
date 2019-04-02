/*
* @Author: banana
* @Date:   2019-03-28 20:46:18
* @Last Modified by:   banana
* @Last Modified time: 2019-04-01 22:13:17
*/
var _mm = require('util/mm.js');

var _payment = {

    getPaymentInfo :function(orderNumber,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/order/pay'),
            data :{
                orderNo:orderNumber
            },
            success:resolve,
            erroe:reject
        });
    },
    getPaymentStatus:function(orderNumber,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/order/queryOrderPayStatus'),
            data :{
                orderNo:orderNumber
            },
            success:resolve,
            erroe:reject
        });
    },
}
module.exports = _payment;