RTS.Match = function(options) {
  options = options || {};

  this.running = false;
  this.players = [];
  this.hud = new RTS.HUD.Wrapper();
  this.minimap = new RTS.Minimap.Wrapper();
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

RTS.Match.prototype.addMap = function(map) {
  this.app = Vizi.Application.instance;
  this.map = map;

  this.app.addObject(map);
  this.app.addObject(map.mini);
};
