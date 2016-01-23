(function() {
  'use strict';

  // Application
  angular.module('kakeibo').factory('Store', Store);

  /** @ngInject */
  function Store(moment, Dispatcher, Kakeibo, Actions) {
    var event = new EventEmitter(),
      dispatchToken,
      kakeibos = [],
      self;

    Dispatcher.on(Actions.REMOVE_KAKEIBO, function(kakeibo) {
      removeKakeibo(kakeibo);
      event.emit('change');
    });

    Dispatcher.on(Actions.GET_KAKAIBOS, function(newKakeibos) {
      setKakeibos(newKakeibos);
      event.emit('change');
    });

    //Read only API
    return {
      getKakeibos: getKakeibos,
      event: event,
      dispatchToken: dispatchToken
    };

    function getKakeibos() {
      return kakeibos;
    }

    function setKakeibos(newList) {
      kakeibos = newList;
    }

    function removeKakeibo(deltarget) {
      kakeibos = kakeibos.filter(function(kakeibo) {
        return kakeibo !== deltarget;
      });
    }
  }
})();
