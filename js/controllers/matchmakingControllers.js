var matchmakingControllers = angular.module('matchmakingControllers', []);

matchmakingControllers.controller('MatchListCtrl', ['$scope', 'Match', function($scope, Match) {
  $scope.matches = Match.query();

  $scope.join = function(matchId) {
    console.log("Attempting to join match: " + matchId);
  }
}]);

matchmakingControllers.controller('MatchCreateCtrl', ['$scope', 'Match', 'Game', function($scope, Match, Game) {
  $scope.match = {name: ''};
  $scope.step = 1;
  $scope.state = 'lobby';

  $scope.save = function() {
    var newMatch = new Match($scope.match);
    newMatch.$save(function(){
      $scope.step++;
    });
  };

  $scope.cancel = function() {
    $scope.match.name = "";
    $scope.step--;
  };

  $scope.start = function() {
    $scope.state = 'game';
    Game.start();
  };
}]);
