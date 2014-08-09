RTS.ClickCircle = function(options) {
  options = options || {};

  var circle = new Vizi.Object();
  circle.name = "Click Circle";

  // Visual
  var radius   = 4,
      segments = 32,
      material = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
      geometry = new THREE.CircleGeometry( radius, segments );

  // Remove center vertex
  geometry.vertices.shift();

  var l = new THREE.Line( geometry, material );
  l.ignorePick = true;
  var line = new Vizi.Visual({ object: l });
  circle.addComponent(line);

  // Script
  var circleScript = new RTS.ClickCircleScript(options);
  circle.addComponent(circleScript);

  return circle;
};

RTS.ClickCircleScript = function(options) {
  options = options || {};

  this.animating = false;
  this.clock = new THREE.Clock();

  Vizi.Script.call(this, options);
};

// Scripts require inheritance script
inherits(RTS.ClickCircleScript, Vizi.Script);

RTS.ClickCircleScript.prototype.realize = function() {
  var visual = this._object.getComponent(Vizi.Visual);
  visual.material.visible = false;
  visual.rotation.x = Math.PI / 2;
  visual.position.y = 0.6;
};

RTS.ClickCircleScript.prototype.update = function() {
  var delta = this.clock.getDelta();
  if (!this.animating) return;

  var visual = this._object.getComponent(Vizi.Visual);
  var v = new THREE.Vector3(0.6 * delta, 0.6 * delta, 0.6 * delta);
  visual.scale.sub(v);

  if (visual.scale.x < 0.1) {
    this.animating = false;
    visual.material.visible = false;
  }
};

RTS.ClickCircleScript.prototype.showAt = function(position) {
  var visual = this._object.getComponent(Vizi.Visual);
  visual.position.set(position.x, visual.position.y, position.z);
  visual.material.visible = true;

  visual.scale.set(0.3, 0.3, 0.3);
  this.animating = true;
}
