'use strict';
require('angular-bootstrap');
require('angular-route');
require('angular-messages');
require('angular-animate');
require('angular-sanitize');
require('underscore');
require('./core/core.module.js');
require('./routes/routes.module.js');

angular.module('toDo', [
  //3rd party
  'ngRoute',
  'ngMessages',
  'ui.bootstrap',
  'ngAnimate',
  'ngSanitize',
  //core
  'core',
  'routes'
]);

//bootstrap && configuration phase of app
require('./app.config.js');

//event listener
require('./app.run.js');
