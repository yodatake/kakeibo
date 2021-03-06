/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('kakeibo')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('c3', c3)
    .constant('_', _)
    .value(
      'dateFormat', {
        'jpn': 'YYYY年MM月DD日'
      });
})();
