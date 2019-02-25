require('./index.css');
require('./miaosha.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');
var templateSeckill = require('./miaosha.string');
var templateTv = require('./index.string');
var _product        = require('service/product-service.js');

var page = {
    init: function() {
        this.slider();
        this.countDown();
        this.renderSeckill();
        this.loadTv();
        this.loadBook();
        this.loadLipstick();
    },
    slider: function() {
        var bannerHtml = _mm.renderHtml(templateBanner);
        $('.banner-con').html(bannerHtml);

        var $slider = $('.banner').unslider({
            dots: true
        });

        $('.banner-con .banner-arrow').click(function() {
            var forward = $(this).hasClass('prev') ? 'prev' : 'next';
            $slider.data('unslider')[forward]();
        });
    },
    countDown: function() {
        var _this = this;
        var start = new Date();
        var end = new Date(2019, 1, 30, 16, 10, 00);
        var result = Math.floor(end - start) / 1000;
        var interval = setInterval(function() {
            if (result > 1) {
                result = result - 1;
                var second = Math.floor(result % 60);
                var minute = Math.floor((result / 60) % 60);
                var hour = Math.floor((result / 3600) % 24);
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                $('.cd_hour span').text(hour);
                $('.cd_minute span').text(minute);
                $('.cd_second span').text(second);
            } else {
                $('.cd_hour span').text(00);
                $('.cd_minute span').text(00);
                $('.cd_second span').text(00);
            }
        }, 1000);
    },
    renderSeckill: function() {
        var  seckillHtml = _mm.renderHtml(templateSeckill);
        $('.slider_wrapper').html(seckillHtml);
    },
    loadTv:function(){
            _product.getIndexTv(function(res){
                    listHtml= _mm.renderHtml(templateTv,{
                        list : res.list
                    });
                    $('#floor1').html(listHtml);
            },function(err){
                _mm.errorTips(err);
            });
    },
    loadBook:function(){
        _product.getIndexBook(function(res){
                listHtml= _mm.renderHtml(templateTv,{
                        list : res.list
                    });
                    $('#floor2').html(listHtml);
        },function(err){
             _mm.errorTips(err);
        });
    },
    loadLipstick:function(){
        _product.getIndexLipstick(function(res){
                listHtml= _mm.renderHtml(templateTv,{
                        list : res.list
                    });
                    $('#floor3').html(listHtml);
        },function(err){
             _mm.errorTips(err);
        });
    }
};

$(function() {
    page.init();
});
