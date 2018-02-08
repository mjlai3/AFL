'use strict';

angular.module('app.services').factory('calculator', ['$http', function($http) {

    return {
        /**
         * Calculates the sum of an array.
         * 
         * @public 
         * @param {Array.<number>} array The array of numbers to be summed.
         * @returns {number} Returns the sum.
         */
        getSum: function(array) {
            var sum = 0;
            array.forEach(function(value) {
                sum += value;
            });

            if (sum % 1 != 0) {
                return parseFloat(sum.toFixed(2));
            } else {
                return sum;
            }
        },

        /**
         * Calculates the average of an array.
         * 
         * @public 
         * @param {Array.<number>} array The array of numbers to be averaged.
         * @returns {number} Returns the average.
         */
        getAverage: function(array) {
            return this.getSum(array) / array.length;
        },

        /**
         * Calculates the largest number of an array.
         * 
         * @public 
         * @param {Array.<number>} array The array of numbers to test.
         * @returns {number} Returns the largest number.
         */
        getMax: function(array) {
            return array.reduce(function(a, b) {
                return Math.max(a, b);
            });
        },

        /**
         * Calculates the tals, averages and season bests
         * for handballs, kicks, marks, score and tackles.
         * 
         * @public 
         * @param {Array} array The array of games to generate calculations for.
         * @returns {Object} Returns an object with calculations of totals, averages and season bests.
         */
        getCalculations: function(games) {
            var obj = {};

            games.forEach(function(game) {
                for (var stat in game) {
                    if (stat !== 'round') {
                        if (obj.hasOwnProperty(stat)) {
                            obj[stat]['record'].push(game[stat]);
                        } else {
                            obj[stat] = {record: [game[stat]]};
                        }
                    }
                }
            });

            for (var stat in obj) {
                var array = obj[stat]['record'];
                obj[stat].average = this.getAverage(array);
                obj[stat].total = this.getSum(array);
                obj[stat].best = this.getMax(array);

                // 2 decimal places for score, round numbers for all others
                if (stat !== 'score') {
                    obj[stat].average = Math.round(obj[stat].average);
                    obj[stat].total = Math.round(obj[stat].total);
                    obj[stat].best = Math.round(obj[stat].best);
                } else {
                    obj[stat].average = parseFloat(obj[stat].average.toFixed(2));;
                    obj[stat].total = parseFloat(obj[stat].total.toFixed(2));;
                    obj[stat].best = parseFloat(obj[stat].best.toFixed(2));;
                }
            }

            return obj;
        }
    };

}]);

    