(function() {
  'use strict';

  // Application
  angular.module('kakeibo').factory('Dispatcher', Dispatcher);

  /** @ngInject */
  function Dispatcher() {
    var self,
      event = new EventEmitter();

    function on(type, listener) {
      if (angular.isDefined(listener)) {
        event.on(type, listener);
      }
    }

    // イベントの発火
    // 第二引数以降にはデータのオブジェクトを渡す。
    function emit(type, data) {
      event.emit(type, data);
    }

    return {
      emit: emit,
      on: on
    }
  }
})();
