RTS.HUD.Selection = function(container) {
  this.container = container.find("#selection");
  this.name = this.container.find(".selection-name");
};

RTS.HUD.Selection.prototype.setName = function(name) {
  this.name.text(name);
};
