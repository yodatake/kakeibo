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
      vm.add = add;
      vm.modify = modify;
      vm.kakeibo = new Kakeibo(new Date(), 0, "");

      // deregister on $destroy
      $rootScope.$on('$destroy', function() {
        // Store.event.removeListener(onKakeiboSelect);
      });

      activate();

      function activate() {
        // Storeのchangeイベントを監視
        Store.event.on('select', onKakeiboSelect);
      }

      function add(kakeibo) {
        // Intの入力値として変換
        kakeibo.money = parseInt(kakeibo.money);
        KakeiboAction.add(kakeibo);
      }

      function modify(kakeibo) {
        // Intの入力値として変換
        kakeibo.money = parseInt(kakeibo.money);
        KakeiboAction.modify(kakeibo);
      }

      function onKakeiboSelect() {
        vm.kakeibo = Store.selectedKakeibo();
      }
    }
  }

})();
