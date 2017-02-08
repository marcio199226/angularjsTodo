(function () {

  'use strict';

  angular.module('core.directives')
    .directive('spinner', function ($timeout) {
      return {
        restrict: 'E',
        template: function($element, $attrs) {
          return [
            '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i><span style="margin-left: 5px;">Loading...</span>',
          ].join("");
        }
      };
    });

})();