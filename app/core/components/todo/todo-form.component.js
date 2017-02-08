(function () {

  'use strict';

  angular.module('core.components.todo.form', [])
    .component('todoForm', {
      templateUrl: '/tpl/core/components/todo/templates/todo-form.html',
      bindings: {
        onAdd: '&'
      },
      controllerAs: 'vm',
      controller: [
        function TodoFormController() {
          var vm = this;

          vm.$onInit = function() {
            vm.task = {
              id: null,
              description : null,
              content : null,
              done : false,
              editable : false
            };
          };

          vm.addTask = function () {
            vm.task.id = + new Date();
            vm.onAdd({ task : vm.task });
            vm.task.description = null;
            vm.task.editable    = false;
            vm.todoForm.$setPristine();
          };
          
          vm.setAsEditable = function() {
            vm.task.editable = !vm.task.editable;
          };
        }
      ]
    });

})();
