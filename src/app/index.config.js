(function() {
  'use strict';

  angular
    .module('kakeibo')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
