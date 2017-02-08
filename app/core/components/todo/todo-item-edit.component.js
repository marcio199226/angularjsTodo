(function () {

  'use strict';

  angular.module('core.components.todo.itemEdit', [])
    .component('todoItemEdit', {
      templateUrl: '/tpl/core/components/todo/templates/todo-item-edit.html',
      bindings: {
        resolve: '<',
        modalInstance: '<'
      },
      controllerAs: 'vm',
      controller: [
        function TodoItemEditController() {
          var vm = this;

          vm.$onInit = function() {
            vm.task = vm.resolve.getItem;
          };

          vm.save = function() {
            vm.modalInstance.close(vm.task);
          };

          vm.setEditMode = function() {
            vm.editMode = !vm.editMode;
          };
        }
      ]
    });

})();