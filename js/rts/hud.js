RTS.HUD = function(match) {
  this.match = match;
  this.container = $("#hud");

  // Load form current match / player
  this.updateMinerals(50);
};

RTS.HUD.prototype.updateMinerals = function(minerals) {
  this.container.find("#minerals").text(minerals);
};
