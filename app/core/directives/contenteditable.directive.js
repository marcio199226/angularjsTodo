(function () {

  'use strict';

  angular.module('core.directives')
    .directive('contenteditable', ['$compile',
      function ($compile) {
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function ($scope, $element, $attrs, $ngModelCtrl) {

            $ngModelCtrl.$render = function() {
              $element.html($ngModelCtrl.$viewValue || '');
            };

            $element.bind('blur', function () {
              $scope.$apply(function read() {
                var html = $element.html();
                if ($attrs.stripBr && html == '<br>') {
                  html = '';
                }
                $ngModelCtrl.$setViewValue(html);
              });
            });

            //re-compile content if ngModel was changed
            $scope.$watch(function() {return $ngModelCtrl.$modelValue}, function(n, o) {
              if(n !== o) {
                $element.empty().append(n);
                $compile($element.contents())($scope);
              }
            }, true);
          }
        };
      }
    ]);

})();