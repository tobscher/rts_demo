RTS.Abilities.Selectable = function(options) {
  options = options || {};
  var object = new Vizi.Object();
  object.name = "selectable";

  var radius   = (options.radius !== undefined ? options.radius : 1),
      segments = 32,
      material = new THREE.LineBasicMaterial( { color: 0x0000ff } ),
      geometry = new THREE.CircleGeometry( radius, segments );

  material.visible = false;

  // Remove center vertex
  geometry.vertices.shift();

  var line = new THREE.Line(geometry, material);
  line.rotation.x = Math.PI / 2;
  line.position.y = 0.2;

  var visual = new Vizi.Visual({ object: line });
  var script = new RTS.SelectableScript();

  object.addComponent(visual);
  object.addComponent(script);

  return object;
};

RTS.SelectableScript = function() {
  Vizi.Script.call(this);
};

inherits(RTS.SelectableScript, Vizi.Script);

RTS.SelectableScript.prototype.update = function() {
};

RTS.SelectableScript.prototype.toggle = function(show) {
  var object = this._object;
  var visual = object.getComponent(Vizi.Visual);

  visual.material.visible = show;
};

RTS.SelectableScript.prototype.show = function() {
  this.toggle(true);
};

RTS.SelectableScript.prototype.hide = function() {
  this.toggle(false);
};
