RTS.HumanPlayer = function(options) {
  options = options || {};

  RTS.Player.call(this, options);

  var game = RTS.Game.instance;
  this.colour = 0xff0000;

  game.cam.position.set(this.startpoint.x, 100, this.startpoint.z + 50);
  game.cam.lookAt(this.startpoint);

  this.controller = new RTS.MainController(game.cam);
  this.object.addChild(this.controller);

  RTS.HumanPlayer.instance = this;
};

inherits(RTS.HumanPlayer, RTS.Player);
