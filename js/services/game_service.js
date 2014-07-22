var gameServices = angular.module('gameServices', []);

gameServices.service('Game', function() {
  this.start = function() {
    var game = new RTS.Game();
    var map = new RTS.Map();
    var match = new RTS.Match({map: map});

    game.run();
    game.fullscreen();
    game.startMatch(match);
  };
});
