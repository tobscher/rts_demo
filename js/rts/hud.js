RTS.HUD = {};

RTS.HUD.Wrapper = function() {
  this.container = $("#hud");

  this.selection = new RTS.HUD.Selection(this.container);
  this.buildQueue = new RTS.HUD.BuildQueue(this.container);
  this.resources = new RTS.HUD.Resources(this.container);
  this.commands = new RTS.HUD.Commands(this.container);

  RTS.HUD.instance = this;
};
