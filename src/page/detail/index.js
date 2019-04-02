/*
 * @Author: lei
 * @Date:   2019-02-27 08:51:28
 * @Last Modified by:   banana
 * @Last Modified time: 2019-03-12 10:31:04
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || '',
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent: function() {
        var _this = this;

        // $(document).ready(function() {
        //     $('.main-img').load(function() {
        //         console.log('SSSSSSSSSSSSSSS');
        //         var w = $(this).width();
        //         var h = $(this).height();
        //         if (w < h) {
        //             $(this).css('height', '100%');
        //             var boxw = $('.main-img').width();
        //             var $margin = $('.main-img').width() - $(this).width();
        //             $(this).css('margin-left', $margin / 2);
        //         } else if (h < w) {
        //             $(this).css('width', '100%');
        //             var boxh = $('.main-img').height();
        //             var $margin = $('.main-img').height() - $(this).height();
        //             $(this).css('margin-top', $margin / 2);
        //         } else {
        //             $(this).css('width', '100%').css('height', '100%');
        //         }

        //     });
        // });

        $('.main-img').onload  = function(){
        	console.log('SSSSSSSSSSSSSSS');
        };

       

        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
         $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });

         // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    loadDetail: function() {
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res);
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },
    filter: function(data) {
        data.subImages = data.subImages.substring(0, data.subImages.length - 1).split(',');
    }
};
$(function() {
    page.init();
})
