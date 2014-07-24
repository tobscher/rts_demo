RTS.NetworkPlayer = function(options) {
  options = options || {};

  RTS.Player.call(this, options);

  var game = RTS.Game.instance;
  this.colour = 0x0000ff;

  this.controller = new RTS.NetworkController();
  this.object.addChild(this.controller);

  RTS.NetworkPlayer.connected[this.id] = this;
};

inherits(RTS.NetworkPlayer, RTS.Player);

RTS.NetworkPlayer.connected = {};
