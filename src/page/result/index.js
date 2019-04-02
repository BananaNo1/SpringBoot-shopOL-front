/*
 * @Author: lei
 * @Date:   2019-01-10 17:13:49
 * @Last Modified by:   banana
 * @Last Modified time: 2019-03-28 21:25:52
 */
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if(type  === 'payment'){
        var orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber =$element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href')+orderNumber); 
    }
    $element.show();
});

console.log('result/index.js');
