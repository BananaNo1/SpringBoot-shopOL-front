/*
* @Author: banana
* @Date:   2019-03-27 14:07:19
* @Last Modified by:   banana
* @Last Modified time: 2019-03-28 13:59:55
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order           = require('service/order-service.js');
var templateIndex   = require('./index.string');

var page = {
        data:{
            orderNumber : _mm.getUrlParam('orderNumber')
        },
        init : function(){
            this.onLoad();
            this.bindEvent();
        },
        onLoad : function(){
            
            navSide.init({
                name : 'order-list'
            });

            this.loadDetail();
        },
        bindEvent :function(){
            var _this = this;

            $(document).on('click','.order-cancel',function(){
                if(window.confirm('确认要取消该订单?')){
                  _order.cancelOrder(_this.data.orderNumber,function(res){
                        _mm.successTips('该订单取消成功');
                        _this.loadDetail();
                    },function(errMsg){
                    _mm.errorTips(errMsg);
                    });
                }        
            });

        },
        //加载订单
        loadDetail:function(){
            var _this = this,
                orderDetailHtml ='',
                $content = $('.content');
            $content.html('<div class="loading"></div>');
                _order.getOrderDetail(this.data.orderNumber,function(res){
                    _this.dataFilter(res);
                    orderDetailHtml = _mm.renderHtml(templateIndex,res);
                    $content.html(orderDetailHtml);
                },function(errMsg){
                    $content.html('<p class="err-tip">'+errMsg+'</p>');
                });
        },
        dataFilter:function(data){
            data.needPay       = data.status == 10;
            data.isCancelable  = data.status == 10;
        },
};

$(function(){
    page.init();
});