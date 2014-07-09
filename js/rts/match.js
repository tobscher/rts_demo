RTS.Match = function(options) {
  options = options || {};

  this.running = false;

  this.initializeMap(options.map);
};

RTS.Match.prototype.start = function() {
  this.running = true;
};

RTS.Match.prototype.loadWorldObject = function(worldObject) {
  this.loader = new Vizi.Loader();
  this.loader.addEventListener("loaded", function(data) {
    var model = data.userData(data.scene);
    Vizi.Application.instance.addObject(model);
  });
  worldObject.load(this.loader);
};

RTS.Match.prototype.addStartpoint = function() {
  this.loadWorldObject(RTS.Buildings.CommandCentre);
  this.loadWorldObject(RTS.Units.Tank);
};

RTS.Match.prototype.initializeMap = function(map) {
  this.map = map;

  Vizi.Application.instance.addObject(map);
  this.addStartpoint();
}
