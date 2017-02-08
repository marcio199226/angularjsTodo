(function () {

  'use strict';

  angular.module('core.directives')
    .directive('imgPreload', [
      function () {
        return {
          restrict: 'A',
          scope: {
            ngSrc: '@'
          },
          link: function ($scope, $element, $attrs) {
            $element.wrap('<div class="image-preloader-spinner"></div>');
            if (!$element.hasClass('fade')) {
              $element.addClass('fade')
            }

            $element
              .on('load', function () {
                $element.addClass('in');
                $element.parent().removeClass('image-preloader-spinner');
              }).on('error', function () {
                $element[0].src = '/images/default-cover.png';
              });

            $scope.$watch('ngSrc', function (newVal) {
              $element.removeClass('in');
              $element.parent().addClass('image-preloader-spinner');
            });
          }
        };
      }
    ]);

})();