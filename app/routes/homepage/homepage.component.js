(function () {

  'use strict';

  angular.module('routes.homepage')
    .component('homepage', {
      templateUrl: '/tpl/routes/homepage/homepage.template.html',
      controllerAs: 'vm',
      controller: ['$scope',
        function HomepageController($scope) {
          var vm = this;
        }
      ]
    });

})();
