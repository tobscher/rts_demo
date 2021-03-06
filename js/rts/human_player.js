RTS.HumanPlayer = function(options) {
  options = options || {};

  RTS.Player.call(this, options);

  var game = RTS.Game.instance;
  this.object.name = "Human Player";
  this.colour = 0xff0000;
  this.worldObjects = [];
  this.selection = new RTS.Selection();

  game.cam.position.set(this.location.x, 100, this.location.z + 50);
  game.cam.lookAt(this.location);

  this.controller = new RTS.MainController(game.cam);
  this.object.addChild(this.controller);

  RTS.HumanPlayer.instance = this;
};

inherits(RTS.HumanPlayer, RTS.Player);
