(function () {

  'use strict';

  require('./todo/todo.component.js');

  angular.module('core.components', [
    'core.components.todo'
  ]);

})();
