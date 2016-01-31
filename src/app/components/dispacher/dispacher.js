(function() {
  'use strict';

  // Application
  angular.module('kakeibo').factory('Dispatcher', Dispatcher);

  /** @ngInject */
  function Dispatcher() {
    // イベント監視機能を委譲
    var event = new EventEmitter();

    // 監視設定
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

    // 公開API
    var service = {
      emit: emit,
      on: on
    };

    return service;
  }
})();
