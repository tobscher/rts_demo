RTS.Services.Boundaries = function() {
  this.topLeft = new THREE.Vector3(0,0,0);
  this.topRight = new THREE.Vector3(0,0,0);
  this.bottomLeft = new THREE.Vector3(0,0,0);
  this.bottomRight = new THREE.Vector3(0,0,0);

  this.projector = new THREE.Projector();

  RTS.Services.Boundaries.instance = this;
};

inherits(RTS.Services.Boundaries, Vizi.Service);

RTS.Services.Boundaries.initialize = function(options) {
};

RTS.Services.Boundaries.prototype.update = function() {
  this.updateBoundaries();
};


RTS.Services.Boundaries.prototype.updateBoundaries = function() {
  this.updateTopLeft();
  this.updateTopRight();
  this.updateBottomLeft();
  this.updateBottomRight();
};

RTS.Services.Boundaries.prototype.updateTopLeft = function() {
  if (!this.topLeft) return;

  var point = this.getPoint(0, 0);

  if (point != null) {
    this.topLeft.copy(point);
  }
};

RTS.Services.Boundaries.prototype.updateTopRight = function() {
  if (!this.topRight) return;

  var point = this.getPoint(window.innerWidth, 0);

  if (point != null) {
    this.topRight.copy(point);
  }
};

RTS.Services.Boundaries.prototype.updateBottomLeft = function() {
  if (!this.bottomLeft) return;

  var point = this.getPoint(0, window.innerHeight - 220);

  if (point != null) {
    this.bottomLeft.copy(point);
  }
};

RTS.Services.Boundaries.prototype.updateBottomRight = function() {
  if (!this.bottomRight) return;

  var point = this.getPoint(window.innerWidth, window.innerHeight - 220);

  if (point != null) {
    this.bottomRight.copy(point);
  }
};

RTS.Services.Boundaries.prototype.updateLeft = function() {
  this.updateTopLeft();
  this.updateBottomLeft();
};

RTS.Services.Boundaries.prototype.updateRight = function() {
  this.updateTopRight();
  this.updateBottomRight();
};

RTS.Services.Boundaries.prototype.updateTop = function() {
  this.updateTopLeft();
  this.updateTopRight();
};

RTS.Services.Boundaries.prototype.updateBottom = function() {
  this.updateBottomLeft();
  this.updateBottomRight();
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

  camera.position.copy(newPosition);
  logger.log(JSON.stringify(newPosition));
};

RTS.Services.Boundaries.instance = null;
Vizi.Services._serviceMap["boundaries"] = { object: RTS.Services.Boundaries };
