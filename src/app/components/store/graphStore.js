(function() {
  'use strict';

  // Application
  angular.module('kakeibo').factory('GraphStore', GraphStore);

  /** @ngInject */
  function GraphStore(moment, Dispatcher, Kakeibo, Actions, Store) {
    var event = new EventEmitter(),
      chart;

    // Dispatcher監視とイベント記述
    Dispatcher.on(Actions.DRAW_GRAPH, function(kakeibos) {
      drawGraph(kakeibos);
      // 変更通知
      event.emit('change');
    });

    //Read only API
    var service = {
      init: initGraph,
      event: event
    };
    return service;


    function initGraph(id) {
      chart = c3.generate({
        bindto: '#' + id,
        data: {
          x: 'dates',
          columns: [],
          type: 'bar'
        },
        axis: {
          x: {
            type: 'category'
          }
        }
      });
    }

    function drawGraph(kakeibos) {
      var datas = convartToDayOfCostGraphData(kakeibos);
      chart.load({
        columns: [
          datas.dates,
          datas.money
        ]
      });
    }

    // 日毎の出費のグラフ用データ生成
    // {"dates":["dates",....], "money":["金額", ...]}
    function convartToDayOfCostGraphData(kakeibos) {
      // 日毎のお金集計
      var dayOfCosts = [];
      kakeibos.forEach(function(kakeibo) {
        // 日付が一致するものを抽出
        var gdata = _.findWhere(dayOfCosts, {
          "date": kakeibo.formatDate()
        });
        if (gdata === undefined) {
          // なければ追加
          dayOfCosts.push({
            "date": kakeibo.formatDate(),
            "money": kakeibo.money
          });
        } else {
          // あった場合には加算
          gdata.money += kakeibo.money;
        }
      });

      // グラフデータ
      var gdata = {
        "dates": [],
        "money": []
      };

      gdata.dates = dayOfCosts.map(function(d) {
        return d.date;
      });
      gdata.money = dayOfCosts.map(function(d) {
        return d.money;
      });
      gdata.dates.unshift('dates');
      gdata.money.unshift('金額');
      return gdata;
    }
  }
})();
