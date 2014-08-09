RTS.Selection = function() {
  this.selected = [];
};

RTS.Selection.prototype.select = function(elements) {
  elements = $.makeArray(elements);

  this.selected = elements;

  if (elements.length == 1) {
    RTS.HUD.instance.selection.setName(elements[0].name);
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
