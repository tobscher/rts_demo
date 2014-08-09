RTS.HUD = {};

RTS.HUD.Wrapper = function() {
  this.container = $("#hud");

  this.selection = new RTS.HUD.Selection(this.container);
  this.resources = new RTS.HUD.Resources(this.container);

  RTS.HUD.instance = this;
};
