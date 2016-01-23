(function() {
  'use strict';

  angular
    .module('kakeibo')
    .directive('kakeiboList', kakeiboList);

  /** @ngInject */
  function kakeiboList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/list/list.html',
      scope: {},
      controller: KakeiboListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function KakeiboListController($rootScope, moment, Kakeibo, Dispatcher, Store, KakeiboAction) {
      var vm = this;
      vm.remove = remove;
      vm.kakeibos = [];

      // deregister on $destroy
      $rootScope.$on('$destroy', function() {
        CartStore.event.removeListener(cartUpdated);
      });

      activate();

      function activate() {
        // Storeのchangeイベントを監視
        Store.event.on('change', onKakeiboChange);
        // 家計簿一覧取得
        KakeiboAction.getKakeibos();
      }

      function remove(kakeibo) {
        KakeiboAction.remove(kakeibo);
      }

      function onKakeiboChange() {
        vm.kakeibos = Store.getKakeibos();
      }
    }
  }

})();
