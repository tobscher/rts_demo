RTS.WorldObject = function(object, options) {
  options = options || {};
  var that = this;
  var selectable = new RTS.Abilities.Selectable(options);
  var script = new RTS.WorldObjectScript();
  var picker = new Vizi.Picker();

  object.addChild(selectable);
  object.addComponent(script);
  object.addComponent(picker);

  picker.addEventListener("mousedown", function(event) {
    script.select();
  });
};

RTS.WorldObject.currentlySelected = null;

RTS.WorldObjectScript = function() {
  Vizi.Script.call(this);
};

inherits(RTS.WorldObjectScript, Vizi.Script);

RTS.WorldObjectScript.prototype.update = function() {
};

RTS.WorldObjectScript.prototype.select = function() {
  var object = this._object;
  var selectable = object.findNode("selectable").getComponent(RTS.SelectableScript);
  var current = RTS.WorldObject.currentlySelected;

  if (current != null) {
    var currentSelectable = current.findNode("selectable").getComponent(RTS.SelectableScript);
    currentSelectable.hide();
  };

  selectable.show();

  RTS.WorldObject.currentlySelected = object;
};
