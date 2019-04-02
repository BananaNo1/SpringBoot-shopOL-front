/*
* @Author: banana
* @Date:   2019-03-18 22:07:16
* @Last Modified by:   banana
* @Last Modified time: 2019-03-26 15:38:43
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm =   require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        // 地址选择
        $(document).on('click', '.address-item', function(){
            $(this).addClass('active')
             .siblings('.address-item').removeClass('active');
             _this.data.selectedAddressId =$(this).data('id');
        });
        //订单提交
        $(document).on('click', '.order-submit', function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId : shippingId
                },function(res){
                    window.location.href = './payment.html?orderNumber='+res.orderNo;
                },function(errMsg){
                    _mm.errorTips(errMsg)
                });
            }else{
                _mm.errorTips('请选择地址后提交');
            }
            $(this).addClass('active')
             .siblings('.address-item').removeClass('active');
             _this.data.selectedAddressId =$(this).data('id');
        });
        //添加地址
        $(document).on('click', '.address-add', function(){
           addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
           });
        });
        //编辑地址
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
               addressModal.show({
                    isUpdate : true,
                    data     : res,
                    onSuccess : function(){
                        _this.loadAddressList();
                    }
                 });
            },function(errMsg){
                _mm.errorTips(errMsg);
            });     
        });
        //删除地址
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址?')){
                _address.deleteAddress(shippingId,function(res){
                    _this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    // 加载地址信息
    loadAddressList : function(){
        var _this       = this;
         $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress,res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败,请刷新后重试</p>');
        })
    },
    //地址状态
    addressFilter :function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag =  false;
            for(var i = 0,length = data.list.length;i<length;i++){
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag =true;
                    break;
                }
            }
            //以前选中的地址不存在
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId =null;
            }
        }
    },
    // 加载商品信息
    loadProductList : function(){
        var _this       = this;
        $('.product-con').html('<div class="loading"></div>');
        // 获取地址列表
        _order.getProductList(function(res){
            var productListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
        }, function(errMsg){
            $('.product-con').html('<p class="err-tip">商品信息加载失败,请刷新后重试</p>');
        })
    },
 
};
$(function(){
    page.init();
})