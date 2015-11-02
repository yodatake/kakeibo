(function() {
  'use strict';

  angular
    .module('kakeibo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
