(function() {
  'use strict';

  angular
    .module('kakeibo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html'
        /**
        ここでControllerは指定しない。
        controller: 'MainController',
        controllerAs: 'main'
        */
      });

    $urlRouterProvider.otherwise('/');
  }

})();
