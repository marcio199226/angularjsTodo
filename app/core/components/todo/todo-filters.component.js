(function () {

  'use strict';

  angular.module('core.components.todo.filters', [])
    .component('todoFilters', {
      templateUrl: '/tpl/core/components/todo/templates/todo-filters.html',
      bindings: {
        onFilterApply: '&'
      },
      controllerAs: 'vm',
      controller: [
        function TodoFiltersController() {
          var vm = this;

          vm.$onInit = function() {
            vm.filterBy = setFilterObj(null, null);
            vm.onFilterApply(vm.filterBy);
          };
          
          vm.filterByProp = function(prop, val) {
            vm.filterBy = setFilterObj(prop, val);
            vm.onFilterApply(vm.filterBy);
          };

          vm.isFilterExpr = function(prop, val) {
            return angular.equals(setFilterObj(prop, val), vm.filterBy);
          };

          function setFilterObj(prop, val) {
            var f       = {};
            f['prop']   = prop;
            f['val']    = val;
            return f; 
          }
        }
      ]
    });

})();