(function() {
  'use strict';

  // Application
  angular.module('kakeibo').factory('Kakeibo', kakeibo);

  /** @ngInject */
  function kakeibo(dateFormat, moment) {

    // コンストラクタ
    function Kakeibo(id, date, money, item) {
      this.id = id;
      this.date = date;
      this.money = money;
      this.item = item;
    }

    // メソッドはコンストラクタの prototype プロパティに定義します
    // 「プロトタイプチェーン」というキーワードで検索してください。
    Kakeibo.prototype.formatDate = function() {
      return moment(this.date).format(dateFormat.jpn);
    };

    // 表示用に金額をフォーマット
    Kakeibo.prototype.moneyDisp = function() {
      return Number(this.money).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    };

    return Kakeibo;
  }
})();
