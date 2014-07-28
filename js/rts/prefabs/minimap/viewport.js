RTS.Minimap.Viewport = function(options) {
  options = options || {};

  var graphics = Vizi.Graphics.instance;
  var viewport = new Vizi.Object({layer: graphics.mapLayer});

  // Visual
  var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
  var geometry = new THREE.Geometry();
  var boundaries = RTS.Services.Boundaries.instance;

  for (var i = 0; i < 8; i++) {
    geometry.vertices.push(new THREE.Vector3(0,0,0));
  }

  var l = new THREE.Line(geometry, material, THREE.LinePieces);
  var line = new Vizi.Visual({ object: l});
  viewport.addComponent(line);

  // Script
  var viewportScript = new RTS.Minimap.ViewportScript(options);
  viewport.addComponent(viewportScript);

  return viewport;
};

RTS.Minimap.ViewportScript = function(options) {
  options = options || {};

  Vizi.Script.call(this, options);
};

inherits(RTS.Minimap.ViewportScript, Vizi.Script);

RTS.Minimap.ViewportScript.prototype.update = function() {
  this.updateViewport();
};

RTS.Minimap.ViewportScript.prototype.updateViewport = function() {
  var visual = this._object.getComponent(Vizi.Visual);
  var boundaries = RTS.Services.Boundaries.instance;
  var vertices = visual.geometry.vertices;

  if (!boundaries.insideBounds) return;

  // Top
  vertices[0].copy(boundaries.topLeft);
  vertices[1].copy(boundaries.topRight);

  // Right
  vertices[2].copy(boundaries.topRight);
  vertices[3].copy(boundaries.bottomRight);

  // Bottom
  vertices[4].copy(boundaries.bottomRight);
  vertices[5].copy(boundaries.bottomLeft);

  // Left
  vertices[6].copy(boundaries.bottomLeft);
  vertices[7].copy(boundaries.topLeft);

  visual.geometry.verticesNeedUpdate = true;
};
