(function () {

  'use strict';
  angular.module('core.commons.localStorage', [])
    .provider('$localStorage', [
      function $localStorageProvider() {
        var prefix = 'app-prefix-';

        //public api for config phase can be used injecting $localStorageProvider
        return {
          setPrefix: function (pref) {
            if (pref && typeof pref === 'string') {
              prefix = pref;
            }
          },
          $get: ['$window', function ($window) {
            return LocalStorage($window, prefix);
          }]
        };

        //public api after config phase can be used as service by injecting $localStorage
        function LocalStorage($window, prefix) {
          return {
            set: function (key, value) {
              $window.localStorage[prefix + key] = value || null;
            },
            get: function (key, defaultValue) {
              return $window.localStorage[prefix + key] || defaultValue;
            },
            setObject: function (key, value) {
              $window.localStorage[prefix + key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
              var obj = $window.localStorage[prefix + key] || defaultValue;
              return (obj.constructor === Array) ? obj : JSON.parse(obj);
            },
            mergeObject: function (key, object) {
              var old = this.getObject(key, {});
              var newObject = angular.extend({}, old, object);
              this.setObject(key, newObject);
            }
          };
        }
      }
    ]);

})();