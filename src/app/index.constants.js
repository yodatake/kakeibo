/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('kakeibo')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
  	.value(
  		'dateFormat', {
  			'jpn': 'YYYY年MM月DD日'
  		});
})();
