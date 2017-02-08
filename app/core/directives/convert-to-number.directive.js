(function () {

  'use strict';

  angular.module('core.directives')
    .directive('convertToNumber', function () {
      return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
          if (ngModel) {
            ngModel.$parsers.push(function (val) {
              return (val == null) ? null : parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
              return (val == null) ? null : '' + val;
            });
          }
        }
      };
    });

})();