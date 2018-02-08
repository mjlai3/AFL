'use strict';

angular.module('app.controllers').controller('PlayersController', ['$scope', 'server', 'calculator', function($scope, server, calculator) {

    $scope.getTeamClass = function(team) {
        return 'team--' + team.toLowerCase().replace(' ', '-');
    }

    $scope.getData = function(url) {
        server.get(url)
            .then(function(results) {
                var players = results.data.players;
                players.forEach(function(player) {
                    player.calculations = calculator.getCalculations(player.games);
                });
                $scope.players = players;
            })
            .catch(function(error) {
                console.log('Error: ' + error);
            });
    }

    $scope.getData('./data/players.json');

}]);