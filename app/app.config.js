'use strict';

angular.module('toDo')
  .config(['$locationProvider', '$routeProvider', '$localStorageProvider',
    function config($locationProvider, $routeProvider, $localStorageProvider) {
      $routeProvider
        .when('/home', {
          template: '<homepage />'
        })
        .otherwise('/home');

      //$locationProvider.html5Mode(true);
    }
  ]);
