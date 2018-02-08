'use strict';

angular.module('app.services').factory('server', ['$http', function($http) {

    return {
        /**
         * Performs a get request to the specified location.
         * 
         * @public 
         * @param {string} url The path to obtain data from.
         * @returns {Promise} returns a promise.
         */
        get: function(url) {
            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };

}]);