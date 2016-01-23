  (function() {
    'use strict';

    // Action種別
    angular
      .module('kakeibo')
      .factory("Actions", function() {
        var options = {
          GET_KAKAIBOS: "GET_KAKAIBOS",
          REMOVE_KAKEIBO: "REMOVE_KAKEIBO"
        };
        return options;
      });

    angular
      .module('kakeibo')
      .factory('KakeiboAction', KakeiboAction);

      /** @ngInject */
      function KakeiboAction(Dispatcher, Actions, Kakeibo) {
        return {
          // ユーザー操作をDispatcherに通知する。
          remove: function(kakeibo) {
            Dispatcher.emit(Actions.REMOVE_KAKEIBO, kakeibo);
          },
          getKakeibos: function () {
            // Ajax通知などでデータを取得してくる.
            var kakeibos = [];
            kakeibos.push(new Kakeibo(new Date('2015-01-01'),1000, 'item1'));
            kakeibos.push(new Kakeibo(new Date('2015-01-02'),1200, 'item1'));
            // Dispatcherにイベント発火通知
            Dispatcher.emit(Actions.GET_KAKAIBOS, kakeibos);
          }
        };
      }


  })();
