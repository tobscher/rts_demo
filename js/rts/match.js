RTS.Match = function(options) {
  options = options || {};

  this.running = false;
  this.players = [];
  this.hud = new RTS.HUD(this);

  this.addMap(options.map, options.mini);
};

RTS.Match.prototype.start = function() {
  this.running = true;
};

RTS.Match.prototype.addPlayer = function(player) {
  this.players.push(player);
  this.map.addChild(player.object);
  this.addStartpointFor(player);
};

RTS.Match.prototype.addStartpointFor = function(player) {
  var startpoint = new RTS.Startpoint(player);
  startpoint.create();
};

RTS.Match.prototype.addMap = function(map, mini) {
  this.map = map;
  this.mini = mini;

  Vizi.Application.instance.addObject(map);
  Vizi.Application.instance.addObject(mini);
};
