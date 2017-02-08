(function () {

'use strict';

angular.
	module('core.filters').
	filter('ucfirst', function () {
		return function (input, arg) {
			return input.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
		};
	});

})();
