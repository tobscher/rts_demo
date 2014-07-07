RTS.ClickCircle = function(options) {
  options = options || {};

  var circle = new Vizi.Object();

  // Visual
  var radius   = 4,
      segments = 32,
      material = new THREE.LineBasicMaterial( { color: 0x00ff00 } ),
      geometry = new THREE.CircleGeometry( radius, segments );

  // Remove center vertex
  geometry.vertices.shift();

  var l = new THREE.Line( geometry, material );
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
  this.animationStep = 0;

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
  if (!this.animating) return;

  var visual = this._object.getComponent(Vizi.Visual);
  this.animationStep += 0.04;
  visual.scale.sub(new THREE.Vector3(0.01, 0.01, 0.01));

  if (this.animationStep >= 1) {
    this.animating = false;
    this.animationStep = 0;
    visual.material.visible = false;
  }
};

RTS.ClickCircleScript.prototype.showAt = function(position) {
  var visual = this._object.getComponent(Vizi.Visual);
  visual.position.set(position.x, visual.position.y, position.z);
  visual.material.visible = true;

  this.animationStep = 0;
  visual.scale.set(0.3, 0.3, 0.3);
  this.animating = true;
}
