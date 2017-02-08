(function () {

  'use strict';

  angular.module('core.directives')
    .directive('confirmAction', ['$interpolate', '$uibModal', '$timeout',
      function ($interpolate, $uibModal, $timeout) {
        return {
          restrict: 'A',
          priority: -10, //so execute before ng-click
          terminal: true,
          link: function ($scope, $element, $attrs) {
            var originialClickAction = $attrs.ngClick;
            
            $element.bind('click', function ($event) {
              //if condition is false don't show modal confirm dialog
              if(angular.isDefined($attrs.confirmCondition)) {
                if($scope.$eval($attrs.confirmCondition) === false) {
                  return;
                }
              }

              $event.stopImmediatePropagation();
              $event.preventDefault();

              var modalInstance = $uibModal.open({
                animation: true,
                size: 'lg',
                component: 'confirmModal',
                resolve: {
                  getTitle: function () {
                      return $attrs.confirmTitle || "Confirm";
                  },
                  getMessage: function () {
                      return $interpolate($attrs.confirmMessage, false, true)($scope) || "Are you sure?";
                  },
                  getAbortButtonText: function () {
                      return $attrs.confirmAbortButton || "CANCEL";
                  },
                  getConfirmButtonText: function () {
                      return $attrs.confirmButton || "YES";
                  }
                }
              });

              modalInstance.result.then(function (result) {
                if (result) {
                  if(angular.isDefined($attrs.elementSelector)) {
                    angular.element(document.querySelector($attrs.elementSelector)).addClass('on-removing');
                    $timeout(function() {
                      angular.element(document.querySelector($attrs.elementSelector)).addClass('removed');
                      $timeout(function() {$scope.$eval(originialClickAction)}, $attrs.delay || 500);
                    }, 500);
                  } else {
                    $scope.$eval(originialClickAction)
                  }
                } else {
                    $scope.$eval($attrs.confirmAbort || angular.noop);
                }
              });
            });
          }
        }
      }
    ])
    .component('confirmModal', {
      bindings : {
        resolve       : '<',
        modalInstance : '<'
      },
      template : [
        '<div class="modal-content">',
         ' <div class="modal-header-bar">',
            '<span class="modal-title">{{$ctrl.title}}</span>',
            '<i class="modal-close icon-x" ng-click="$ctrl.abort()"></i>',
          '</div>',
          '<div class="modal-inner-content text-center">',
            '{{$ctrl.msg | trusted}}',
          '</div>',
          '<div class="modal-footer">',
            '<button class="btn" ng-click="$ctrl.abort()">{{$ctrl.abortText}}</button>',
            '<button class="btn btn-lime" ng-click="$ctrl.confirmed()">{{$ctrl.confirmText}}</button>',
          '</div>',
        '</div>'
      ].join(''),
      controller: ['$scope', 
        function ($scope) {
          this.$onInit = function() {
            this.title        = this.resolve.getTitle;
            this.msg          = this.resolve.getMessage;
            this.abortText    = this.resolve.getAbortButtonText;
            this.confirmText  = this.resolve.getConfirmButtonText;
          };

          this.confirmed = function () {
              this.modalInstance.close(true);
          };

          this.abort = function () {
              this.modalInstance.close(false);
          };
        }
      ],
    });

})();