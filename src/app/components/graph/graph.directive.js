(function() {
  'use strict';

  angular
    .module('kakeibo')
    .directive('kakeiboGraph', kakeiboGraph);

  /** @ngInject */
  function kakeiboGraph() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/graph/graph.html',
      scope: {},
      controller: KakeiboGraphController,
      controllerAs: 'graph',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function KakeiboGraphController($rootScope, moment, Kakeibo, Dispatcher, Store, GraphStore, KakeiboAction) {
      var vm = this;

      // deregister on $destroy
      $rootScope.$on('$destroy', function() {
      //  GraphStore.event.removeListener(drawGraph);
      });

      // 初期化処理
      activate();
      function activate() {
        // GraphStore初期化(グラフを描画するdomを指定)
        GraphStore.init('chart');
        // Storeのchangeイベントを監視
        Store.event.on('change', drawGraph);
      }
      // グラフの描画
      function drawGraph() {
        KakeiboAction.drawGraph(Store.getKakeibos());
      }
    }
  }

})();
