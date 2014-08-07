RTS.Services.Boundaries = function() {
  this.topLeft = new THREE.Vector3(0,0,0);
  this.topRight = new THREE.Vector3(0,0,0);
  this.bottomLeft = new THREE.Vector3(0,0,0);
  this.bottomRight = new THREE.Vector3(0,0,0);

  this.projector = new THREE.Projector();

  this.updateIfChanged = function(oldPosition, newPosition) {
    if (!oldPosition.equals(newPosition)) {
      oldPosition.copy(newPosition);
      this.changed = true;
    }
  };

  RTS.Services.Boundaries.instance = this;
};

inherits(RTS.Services.Boundaries, Vizi.Service);

RTS.Services.Boundaries.initialize = function(options) {
};

RTS.Services.Boundaries.prototype.update = function() {
  this.updateBoundaries();
};


RTS.Services.Boundaries.prototype.updateBoundaries = function() {
  this.changed = false;

  var topLeft     = this.getPoint(0, 0),
      topRight    = this.getPoint(window.innerWidth, 0),
      bottomLeft  = this.getPoint(0, window.innerHeight - 220),
      bottomRight = this.getPoint(window.innerWidth, window.innerHeight - 220);

  if (topLeft     == null ||
      topRight    == null ||
      bottomLeft  == null ||
      bottomRight == null ) {
    return;
  }

  this.updateIfChanged(this.topLeft, topLeft);
  this.updateIfChanged(this.topRight, topRight);
  this.updateIfChanged(this.bottomLeft, bottomLeft);
  this.updateIfChanged(this.bottomRight, bottomRight);

  if (this.changed) {
    RTS.Minimap.ViewportScript.instance.updateViewport();
  }
};

RTS.Services.Boundaries.prototype.getPoint = function(x, y) {
  var match = RTS.Game.instance.currentMatch;

  var vector = new THREE.Vector3(
  ( x / window.innerWidth ) * 2 - 1,
  - ( y / window.innerHeight ) * 2 + 1,
  0.5
  );

  var camera = Vizi.Graphics.instance.camera;
  this.projector.unprojectVector( vector, camera );

  var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  var map = match.map;
  var visual = map.getComponent(Vizi.Visual);
  var object = visual.object;

  var intersects = ray.intersectObjects([object], true);

  if ( intersects.length > 0 ) {
    var p = intersects[0].point;
    return new THREE.Vector3(p.x, 1, p.z);
  }

  return null;
};

RTS.Services.Boundaries.prototype.setTo = function(point) {
  var distance = this.topLeft.distanceTo(this.bottomLeft);
  var center = distance / 2;
  var game = RTS.Game.instance;
  var match = game.currentMatch;
  var map = match.map;
  var cameraLock = map.cameraLock;

  var camera = Vizi.Graphics.instance.camera;
  var newPosition = new THREE.Vector3(point.x, camera.position.y, point.z + 50 + center);

  if (newPosition.x < cameraLock.left) newPosition.x = cameraLock.left;
  if (newPosition.x > cameraLock.right) newPosition.x = cameraLock.right;
  if (newPosition.z < cameraLock.top) newPosition.z = cameraLock.top;
  if (newPosition.z > cameraLock.bottom) newPosition.z = cameraLock.bottom;

  logger.log(JSON.stringify(newPosition));

  camera.position.copy(newPosition);
};

RTS.Services.Boundaries.instance = null;
Vizi.Services._serviceMap["boundaries"] = { object: RTS.Services.Boundaries };
