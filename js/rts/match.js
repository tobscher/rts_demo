RTS.Match = function(options) {
  options = options || {};

  this.running = false;

  this.initializeMap(options.map);
};

RTS.Match.prototype.start = function() {
  this.running = true;
}

RTS.Match.prototype.initializeMap = function(map) {
  this.map = map;

  Vizi.Application.instance.addObject(map);
}
