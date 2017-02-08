'use strict';

require('./confirmModal/confirm.service.js');
require('./underscore.service.js');
require('./localStorage.provider.js');

angular.module('core.commons', [
    'core.commons.confirm',
    'core.commons.underscore',
    'core.commons.localStorage'
]);
