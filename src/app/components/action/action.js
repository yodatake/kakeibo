  (function() {
    'use strict';

    // Action種別
    angular
      .module('kakeibo')
      .factory("Actions", function() {
        var options = {
          GET_KAKAIBOS: "GET_KAKAIBOS",
          REMOVE_KAKEIBO: "REMOVE_KAKEIBO",
          ADD_KAKEIBO: "ADD_KAKEIBO",
          MODIFY_KAKEIBO: "MODIFY_KAKEIBO",
          SELECT_KAKEIBO: "SELECT_KAKEIBO",
          DRAW_GRAPH: "DRAW_GRAPH"
        };
        return options;
      });

    angular
      .module('kakeibo')
      .factory('KakeiboAction', KakeiboAction);

    /** @ngInject */
    function KakeiboAction(Dispatcher, Actions) {
      return {
        // ユーザー操作をDispatcherに通知する。
        remove: function(kakeibo) {
          // Dispatcherにイベント発火通知
          Dispatcher.emit(Actions.REMOVE_KAKEIBO, kakeibo);
        },
        getKakeibos: function() {
          // 本来はここでAjax通知などでデータを取得してくる.
          // Dispatcherにイベント発火通知
          Dispatcher.emit(Actions.GET_KAKAIBOS);
        },
        select: function(kakeibo) {
          // Dispatcherにイベント発火通知
          Dispatcher.emit(Actions.SELECT_KAKEIBO, kakeibo);
        },
        add: function(kakeibo) {
          // Dispatcherにイベント発火通知
          Dispatcher.emit(Actions.ADD_KAKEIBO, kakeibo);
        },
        modify: function(kakeibo) {
          // Dispatcherにイベント発火通知
          Dispatcher.emit(Actions.MODIFY_KAKEIBO, kakeibo);
        },
        drawGraph: function(kakeibos) {
          Dispatcher.emit(Actions.DRAW_GRAPH, kakeibos);
        }
      };
    }


  })();
