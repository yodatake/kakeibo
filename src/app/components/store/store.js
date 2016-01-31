(function() {
  'use strict';

  // Application
  angular.module('kakeibo').factory('Store', Store);

  /** @ngInject */
  function Store(moment, Dispatcher, Kakeibo, Actions) {
    var event = new EventEmitter(),
      dispatchToken,
      kakeibos = [],
      selKakeibo = {};

    // テストなのでここで初期化させてください。
    kakeibos.push(new Kakeibo(1, new Date('2015-01-01'), 1000, 'おやき'));
    kakeibos.push(new Kakeibo(2, new Date('2015-01-02'), 1200, 'おはぎ'));

    // Dispatcher監視
    Dispatcher.on(Actions.GET_KAKAIBOS, function() {
      // 変更通知
      event.emit('change');
    });

    // Dispatcher監視とイベント記述
    Dispatcher.on(Actions.REMOVE_KAKEIBO, function(kakeibo) {
      removeKakeibo(kakeibo);
      // 変更通知
      event.emit('change');
    });

    function removeKakeibo(deltarget) {
      kakeibos = kakeibos.filter(function(kakeibo) {
        return kakeibo !== deltarget;
      });
    }

    // Dispatcher監視
    Dispatcher.on(Actions.ADD_KAKEIBO, function(kakeibo) {
      addKakeibo(kakeibo);
      // 変更通知
      event.emit('change');
    });

    function addKakeibo(kakeibo) {
      // 引数のKakeiboの値を使って新しくKakeiboオブジェクトを生成する。
      var newone = angular.copy(kakeibo);
      newone.id = numberingId();
      newone.money = kakeibo.money;
      kakeibos.push(newone);
    }

    Dispatcher.on(Actions.SELECT_KAKEIBO, function(kakeibo) {
      selectKakeibo(kakeibo);
      // 選択通知
      event.emit('select');
    });

    function selectKakeibo(kakeibo) {
      selKakeibo = angular.copy(kakeibo);
    }

    // 変更イベント監視
    Dispatcher.on(Actions.MODIFY_KAKEIBO, function(kakeibo) {
      modifyKakeibo(kakeibo);
      // 変更通知
      event.emit('change');
    });
    function modifyKakeibo(kakeibo) {
      kakeibos.forEach(function(k, idx, kakeibos) {
        if (kakeibo.id === k.id) {
          kakeibos.splice(idx, 1, angular.copy(kakeibo));
        }
      });
    }

    // IDの採番
    function numberingId() {
      // idのリストを取得
      var ids = kakeibos.map(function(kakeibo) {
        return kakeibo.id;
      });
      // 最大値+1
      return Math.max.apply(null, ids) + 1;
    }

    //Read only API
    var service = {
      getKakeibos: getKakeibos,
      selectedKakeibo: selectedKakeibo,
      dispatchToken: dispatchToken,
      event: event
    };

    return service;

    function getKakeibos(kakeibo) {
      return kakeibos;
    }

    function selectedKakeibo(kakeibo) {
      return selKakeibo;
    }
  }
})();
