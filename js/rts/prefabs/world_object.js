RTS.WorldObject = function(object, player, options) {
  options = options || {};
  options["colour"] = player.colour;
  options["owner"] = player.id;

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

  object.commands = [];

  object.addChild(selectable);
  object.addComponent(script);
  object.addComponent(picker);

  picker.addEventListener("mousedown", function(event) {
    script.select();
  });

  object.id = options.id;
  object.sight = options.sight;

  var game = RTS.Game.instance;

  object.mini = new RTS.Minimap.WorldObject(player, options);
  game.app.addObject(object.mini);
};

RTS.WorldObject.currentlySelected = null;

RTS.WorldObjectScript = function(options) {
  options = options || {};
  Vizi.Script.call(this);

  this.location = new THREE.Vector3(options.location.x, options.location.y, options.location.z);
  this.colour = new THREE.Color(options.colour);
  this.owner = options.owner;
};

inherits(RTS.WorldObjectScript, Vizi.Script);

RTS.WorldObjectScript.prototype.realize = function() {
  var object = this._object;
  var visual = object.getComponent(Vizi.Visual);
  var me = RTS.HumanPlayer.instance;

  object.transform.position.copy(this.location);
  object.mini.transform.position.copy(this.location);

  if (this.owner == me.id) {
    RTS.HumanPlayer.instance.worldObjects.push(object.mini);
    RTS.Minimap.FogOfWar.drawCircle(object.mini.transform.position);
  }

  visual.material.materials[0].color = this.colour;
};

RTS.WorldObjectScript.prototype.update = function() {
};

RTS.WorldObjectScript.prototype.select = function() {
  var me = RTS.HumanPlayer.instance;

  var object = this._object;
  var selectable = object.findNode("selectable").getComponent(RTS.SelectableScript);
  var selected = me.selection.selected;

  if (selected.length > 0) {
    for (var i = 0; i < selected.length; i++) {
      var current = selected[i];
      var currentSelectable = current.findNode("selectable").getComponent(RTS.SelectableScript);

      // Element is already selected
      if (selectable == currentSelectable) return;

      currentSelectable.hide();
    }
  };

  selectable.show();

  me.selection.select(object);
};
