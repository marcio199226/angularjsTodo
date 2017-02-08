(function () {

  'use strict';

  angular.module('core.filters')
    .filter('trusted', function ($sce) {
      return function (html) {
        return $sce.trustAsHtml(html)
      }
    })

})();