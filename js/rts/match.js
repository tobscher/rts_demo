RTS.Match = function(options) {
  options = options || {};

  this.running = false;
  this.players = [];
  this.hud = new RTS.HUD(this);

  this.initializeMap(options.map);
};

RTS.Match.prototype.start = function() {
  this.running = true;
};

RTS.Match.prototype.addPlayer = function(player) {
  this.players.push(player);
};

RTS.Match.prototype.addStartpoint = function() {
  var that = this;
  this.loader = new Vizi.Loader();
  this.loader.addEventListener("loaded", function(data) {
    var model = data.userData.type(data.scene, data.userData.options);
    that.map.addChild(model);
  });

  RTS.Buildings.CommandCentre.load(this.loader);
  RTS.Units.Tank.load(this.loader);
  RTS.Units.SCV.load(this.loader);
  RTS.Resources.Minerals.load(this.loader);
};

RTS.Match.prototype.initializeMap = function(map) {
  this.map = map;

  Vizi.Application.instance.addObject(map);
  this.addStartpoint();
};
