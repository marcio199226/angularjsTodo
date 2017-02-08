(function () {

  'use strict';

  require('./todo-form.component.js');
  require('./todo-lists.component.js');
  require('./todo-filters.component.js');
  require('./todo-item.component.js');
  require('./todo-item-edit.component.js');

  angular.module('core.components.todo', [
    'core.components.todo.form',
    'core.components.todo.lists',
    'core.components.todo.filters',
    'core.components.todo.item',
    'core.components.todo.itemEdit'
  ])
  .component('todo', {
    templateUrl: '/tpl/core/components/todo/templates/container.html',
    bindings: {
      persistToStorage      : '@?',
      storagePersistPrefix  : '@?'
    },
    transclude: {
      'todoHeader'  : '?todoHeader',
      'todoFooter'  : '?todoFooter'
    },
    controllerAs: 'vm',
    controller: ['$scope', '$localStorage',
      function TodoContainerController($scope, $localStorage) {
        var vm            = this;
        var storagePrefix = null;

        vm.$onInit = function() {
          storagePrefix       = (vm.storagePersistPrefix) ? vm.storagePersistPrefix + 'lists' : 'lists';
          vm.todosCollections = (vm.persistToStorage) ? $localStorage.getObject(storagePrefix, []) : [];
          vm.filteredTodos    = vm.todosCollections;
        };

        vm.onAddTask = function(task) {
          var item = angular.copy(task.task, item);
          vm.todosCollections.unshift(item);
        };

        vm.editTask = function(obj) {
          vm.todosCollections[obj.index] = obj.task;
        };

        vm.removeTask = function(obj) {
          vm.todosCollections.splice(obj.index, 1);
        };

        vm.filterCollection = function(expr) {
          if(!expr.prop) {
            vm.filteredTodos = vm.todosCollections;
            return;
          }
          vm.filteredTodos = vm.todosCollections.filter(function(item) {
            return item[expr.prop] === expr.val;
          });
        };
        
        //usiamo $watch con deep mode perche $watchCollection non rileva le modifiche sulla struttura interna dell'array ma solamente add/remove
        $scope.$watch(function() {return vm.todosCollections}, function(n, o) {
          saveToStorage(storagePrefix);
        }, true);

        //private

        function saveToStorage(storagePrefix) {
          if(vm.persistToStorage) {
            $localStorage.setObject(storagePrefix, vm.todosCollections);
          }
        }
      }
    ]
  });

})();
