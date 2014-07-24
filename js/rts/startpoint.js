RTS.Startpoint = function(player) {
  this.player = player;
};

RTS.Startpoint.prototype.create = function() {
  var that = this;
  this.loader = new Vizi.Loader();
  this.loader.addEventListener("loaded", function(data) {
    var model = data.userData.type(data.scene, that.player, data.userData.options);
    that.player.object.addChild(model);
  });

  RTS.Buildings.CommandCentre.load(this.loader);
  RTS.Units.Tank.load(this.loader);
  RTS.Units.SCV.load(this.loader);
  RTS.Resources.Minerals.load(this.loader);
};
