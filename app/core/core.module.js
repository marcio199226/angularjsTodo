(function () {

  'use strict';

  require('./api/api.module.js');
  require('./components/components.module.js');
  require('./directives/directives.module.js');
  require('./filters/filters.module.js');
  require('./interceptors/interceptors.module.js');
  require('./commons/commons.module.js');

  angular.module('core', [
    'core.api',
    'core.components',
    'core.directives',
    'core.filters',
    'core.interceptors',
    'core.commons'
  ]);

})();