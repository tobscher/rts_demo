RTS.Selection = function() {
  this.selected = [];
};

RTS.Selection.prototype.select = function(elements) {
  elements = $.makeArray(elements);

  this.selected = elements;

  if (elements.length == 1) {
    var hud = RTS.HUD.instance;
    hud.selection.setName(elements[0].name);
    hud.commands.set(elements[0].commands);
  }
};

RTS.Selection.prototype.add = function(element) {
  this.selected.push(element);
};

RTS.Selection.prototype.commands = function() {
  // Nothing selected
  if (this.selected == 0) return [];

  return this.selected[0].commands;
};
