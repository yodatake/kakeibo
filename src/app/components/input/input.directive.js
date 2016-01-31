(function() {
  'use strict';

  angular
    .module('kakeibo')
    .directive('kakeiboInput', kakeiboInput);

  /** @ngInject */
  function kakeiboInput() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/input/input.html',
      scope: {},
      controller: KakeiboInputController,
      controllerAs: 'input',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function KakeiboInputController($rootScope, moment, Kakeibo, Dispatcher, Store, KakeiboAction) {
      var vm = this;
      // とりあえず空で初期化
      vm.kakeibo = new Kakeibo(new Date(), 0, "");

      // deregister on $destroy
      $rootScope.$on('$destroy', function() {
        Store.event.removeListener(onKakeiboSelect);
      });

      // 初期化処理
      function activate() {
        // Storeのchangeイベントを監視
        Store.event.on('select', onKakeiboSelect);
      }
      // 新規ボタン押下時処理
      vm.add = function(kakeibo) {
        // Intの入力値として変換
        kakeibo.money = parseInt(kakeibo.money);
        KakeiboAction.add(kakeibo);
      };
      // 変更ボタン押下時処理
      vm.modify = function(kakeibo) {
        // Intの入力値として変換
        kakeibo.money = parseInt(kakeibo.money);
        KakeiboAction.modify(kakeibo);
      };

      function onKakeiboSelect() {
        vm.kakeibo = Store.selectedKakeibo();
      }

      activate();
    }
  }

})();
