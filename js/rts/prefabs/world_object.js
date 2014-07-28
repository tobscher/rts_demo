RTS.WorldObject = function(object, player, options) {
  options = options || {};
  options["colour"] = player.colour;

  if (options.width === undefined) {
    options.width = 20;
  }

  if (options.depth === undefined) {
    options.depth = 20;
  }

  var that = this;
  var selectable = new RTS.Abilities.Selectable(options);
  var script = new RTS.WorldObjectScript(options);
  var picker = new Vizi.Picker();

  object.addChild(selectable);
  object.addComponent(script);
  object.addComponent(picker);

  picker.addEventListener("mousedown", function(event) {
    script.select();
  });

  object.id = options.id;

  var graphics = Vizi.Graphics.instance;
  var game = RTS.Game.instance;

  var miniColor = player.colour;

  var me = RTS.HumanPlayer.instance;
  if (player.id == me.id) {
    miniColor = 0x00ff00;
  }

  object.mini = new Vizi.Object({layer: graphics.mapLayer});
  var geometry = new THREE.BoxGeometry(options.width, 5, options.depth);
  var material = new THREE.MeshBasicMaterial({ color: miniColor});
  var visual = new Vizi.Visual({
    geometry: geometry,
    material: material
  });

  object.mini.addComponent(visual);
  game.app.addObject(object.mini);
};

RTS.WorldObject.currentlySelected = null;

RTS.WorldObjectScript = function(options) {
  options = options || {};
  Vizi.Script.call(this);

  this.location = new THREE.Vector3(options.location.x, options.location.y, options.location.z);
  this.colour = new THREE.Color(options.colour);
};

inherits(RTS.WorldObjectScript, Vizi.Script);

RTS.WorldObjectScript.prototype.realize = function() {
  var object = this._object;
  var visual = object.getComponent(Vizi.Visual);

  object.transform.position.copy(this.location);
  debugger;
  object.mini.transform.position.copy(this.location);

  visual.material.materials[0].color = this.colour;
};

RTS.WorldObjectScript.prototype.update = function() {
};

RTS.WorldObjectScript.prototype.select = function() {
  var object = this._object;
  var selectable = object.findNode("selectable").getComponent(RTS.SelectableScript);
  var current = RTS.WorldObject.currentlySelected;

  if (current != null) {
    var currentSelectable = current.findNode("selectable").getComponent(RTS.SelectableScript);

    // Element is already selected
    if (selectable == currentSelectable) return;
    currentSelectable.hide();
  };

  selectable.show();

  RTS.WorldObject.currentlySelected = object;
};
