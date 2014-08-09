RTS.HUD = function(match) {
  this.match = match;
  this.container = $("#hud");
  this.minerals = this.container.find("#minerals");
  this.selection = this.container.find("#selection .selection-name");

  // Load form current match / player
  this.updateMinerals(50);

  RTS.HUD.instance = this;
};

RTS.HUD.prototype.updateMinerals = function(minerals) {
  this.minerals.text(minerals);
};

RTS.HUD.prototype.updateSelection = function(name) {
  this.selection.text(name);
};
