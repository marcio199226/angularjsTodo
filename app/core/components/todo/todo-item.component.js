(function () {

  'use strict';

  angular.module('core.components.todo.item', [])
    .component('todoItem', {
      templateUrl: '/tpl/core/components/todo/templates/todo-item.html',
      bindings: {
        task: '<',
        onEdit: '&',
        onRemove: '&'
      },
      controllerAs: 'vm',
      controller: [
        function TodoItemController() {
          var vm = this;
        }
      ]
    });

})();