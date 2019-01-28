/*
 * @Author: lei
 * @Date:   2019-01-10 17:13:49
 * @Last Modified by:   lei
 * @Last Modified time: 2019-01-11 09:27:09
 */
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');

    $element.show();
});

console.log('result/index.js');
