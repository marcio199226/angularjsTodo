(function () {

  'use strict';

  angular.module('core.components.todo.lists', [])
    .component('todoLists', {
      templateUrl: '/tpl/core/components/todo/templates/todo-lists.html',
      bindings: {
        collection: '<',
        onEdit: '&',
        onRemove: '&'
      },
      controllerAs: 'vm',
      controller: ['$uibModal',
        function TodoListCollectionsController($uibModal) {
          var vm = this;

          vm.markAsDone = function(index, item) {
            var task = angular.copy(item, task);
            task.done = !task.done;
            vm.onEdit({ index : index, task : task });
          };

          vm.editTask = function(index, item) {
            var editTask = $uibModal.open({
              animation: true,
              size: 'lg',
              component: 'todoItemEdit',
              resolve: {
                getItem: function () {
                  return item;
                }
              }
            });

            editTask.result
              .then(function(item) {
                if(item) {
                  vm.onEdit({ index : index, task : item });
                }
              });
          };

          vm.removeTask = function(index) {
            vm.onRemove({ index : index });
          };
        }
      ]
    });

})();