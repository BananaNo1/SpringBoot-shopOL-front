/*
* @Author: banana
* @Date:   2019-03-27 13:00:00
* @Last Modified by:   banana
* @Last Modified time: 2019-04-24 13:57:28
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var Pagination = require('util/pagination/index.js');
var _mm             = require('util/mm.js');
var _order           = require('service/order-service.js');
var templateIndex   = require('./index.string');

var page = {
        data:{
            listParam:{
                pageNum :1,
                pageSize:10
            }
        },
        init : function(){
            this.onLoad();
        },
        onLoad : function(){
            this.loadOrderList();
            navSide.init({
                name : 'order-list'
            });
        },
        //加载订单
        loadOrderList:function(){
            var _this = this,
                orderListHtml ='',
                $listCon = $('.order-list-con');
            $listCon.html('<div class="loading"></div>');
            _order.getOrderList(this.data.listParam,function(res){
                    orderListHtml = _mm.renderHtml(templateIndex,res);
                    $listCon.html(orderListHtml);
                    _this.loadPagination({
                        hasPreviousPage: res.hasPreviousPage,
                        prePage: res.prePage,
                        hasNextPage: res.hasNextPage,
                        nextPage: res.nextPage,
                        pageNum: res.pageNum,
                        pages: res.pages
                    });
                },function(errMsg){
                    $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
                });
        },
        loadPagination : function(pageInfo){
            var _this = this;
            this.pagination ? '' : (this.pagination = new Pagination());
            this.pagination.render($.extend({}, pageInfo, {
                container : $('.pagination'),
                onSelectPage : function(pageNum){
                 _this.data.listParam.pageNum = pageNum;
                 _this.loadOrderList();
            }
        }));
    }
       
};

$(function(){
    page.init();
});