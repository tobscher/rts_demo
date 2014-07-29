RTS.Startpoint = function(player) {
  this.player = player;

  this.elementsToLoad = (this.player.startpoint.buildings.length + this.player.startpoint.units.length);
  this.counter = 0;
};

RTS.Startpoint.prototype.create = function() {
  var that = this;
  this.loader = new Vizi.Loader();
  this.loader.addEventListener("loaded", function(data) {
    var model = data.userData.type(data.scene, that.player, data.userData.options);
    that.player.object.addChild(model);

    that.counter++;
    // Everything loaded, update viewport on minimap
    if (that.counter == that.elementsToLoad) {
      var boundaries = RTS.Services.Boundaries.instance;
      boundaries.boundariesNeedUpdating = true;
    }
  });

  for (var i = 0; i < that.player.startpoint.buildings.length; i++) {
    var b = that.player.startpoint.buildings[i];
    var t = RTS.Buildings[b.type];
    t.load(this.loader, b);
  }

  for (var i = 0; i < that.player.startpoint.units.length; i++) {
    var u = that.player.startpoint.units[i];
    var t = RTS.Units[u.type];
    t.load(this.loader, u);
  }
};
