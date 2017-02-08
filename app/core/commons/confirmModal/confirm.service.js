(function () {

    'use strict';

    angular.module('core.commons.confirm', [])
            .factory('ConfirmService', function ($uibModal) {
                return {
                    confirm: function (title, msg, callBackSuccess, callBackError) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: '/tpl/core/commons/confirmModal/confirm.template.html',
                            controller: function ($scope, $uibModalInstance, getTitle, getMessage) {
                                $scope.title = getTitle;
                                $scope.msg = getMessage;

                                $scope.continue = function () {
                                    $uibModalInstance.close(true);
                                };

                                $scope.abort = function () {
                                    $uibModalInstance.close(false);
                                };
                            },
                            resolve: {
                                getTitle: function () {
                                    return title;
                                },
                                getMessage: function () {
                                    return msg;
                                }
                            }
                        });
                        
                        modalInstance.result.then(function (result) {
                            if (result) {
                                callBackSuccess();
                            } else {
                                callBackError();
                            }
                        });
                    }
                };
            });

})();