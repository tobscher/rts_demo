var gameServices = angular.module('gameServices', []);

gameServices.service('Game', function() {
  this.game = new RTS.Game();

  this.create = function() {
    this.map = new RTS.Map();
    this.match = new RTS.Match({map: this.map});
    this.player = new RTS.HumanPlayer({name: "Tobscher"});
    this.match.addPlayer(this.player);
  };

  this.start = function() {
    this.game.run();
    this.game.fullscreen();
    this.game.startMatch(this.match);
  };
});
