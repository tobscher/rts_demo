RTS.HUD.Resources = function(container) {
  this.container = container.find("#minerals");
};

RTS.HUD.Resources.prototype.setMinerals = function(value) {
  this.container.text(minerals);
};
