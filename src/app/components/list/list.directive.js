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
      controllerAs: 'list',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function KakeiboListController($rootScope, moment, Kakeibo, Dispatcher, Store, KakeiboAction) {
      var vm = this;

      // htmlにバインドする家計簿一覧
      vm.kakeibos = [];

      // deregister on $destroy
      $rootScope.$on('$destroy', function() {
        Store.event.removeListener(onKakeiboChange);
      });

      // 初期化処理
      function activate() {
        // Storeのchangeイベントを監視
        Store.event.on('change', onKakeiboChange);
        // 家計簿一覧取得
        KakeiboAction.getKakeibos();
      }
      // Storeの家計簿が変更された時のイベントハンドラ
      function onKakeiboChange() {
        vm.kakeibos = Store.getKakeibos();
        KakeiboAction.drawGraph(vm.kakeibos);
      }

      // 削除ボタン押下時処理
      vm.remove = function(kakeibo) {
        KakeiboAction.remove(kakeibo);
      };
      // 選択ボタン押下時処理
      vm.selected = function(kakeibo) {
        KakeiboAction.select(kakeibo);
      };

      activate();
    }
  }

})();
