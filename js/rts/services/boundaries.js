RTS.Services.Boundaries = function() {
  this.nullVector = new THREE.Vector3(0,0,0);

  this.topLeft = new THREE.Vector3(0,0,0);
  this.topRight = new THREE.Vector3(0,0,0);
  this.bottomLeft = new THREE.Vector3(0,0,0);
  this.bottomRight = new THREE.Vector3(0,0,0);

  this.projector = new THREE.Projector();
  this.insideBounds = true;
  this.boundariesNeedUpdating = false;

  RTS.Services.Boundaries.instance = this;
};

inherits(RTS.Services.Boundaries, Vizi.Service);

RTS.Services.Boundaries.initialize = function(options) {
};

RTS.Services.Boundaries.prototype.update = function() {
  if (this.boundariesNeedUpdating) {
    this.updateBoundaries();
    this.checkBoundaries();

    this.boundariesNeedUpdating = false;
  }
};

RTS.Services.Boundaries.prototype.resetBoundaries = function() {
  this.topLeft = this.topLeftOld.clone();
  this.topRight = this.topRightOld.clone();
  this.bottomRight = this.bottomRightOld.clone();
  this.bottomLeft = this.bottomLeftOld.clone();

  var camera = Vizi.Graphics.instance.camera;
  camera.position.copy(this.validCameraPosition);

  this.boundariesNeedUpdating = true;
};

RTS.Services.Boundaries.prototype.updateBoundaries = function() {
  this.updateTopLeft();
  this.updateTopRight();
  this.updateBottomLeft();
  this.updateBottomRight();
};

RTS.Services.Boundaries.prototype.updateTopLeft = function() {
  if (!this.topLeft) return;

  this.topLeft.copy(this.getPoint(0, 0));
};

RTS.Services.Boundaries.prototype.updateTopRight = function() {
  if (!this.topRight) return;

  this.topRight.copy(this.getPoint(window.innerWidth, 0));
};

RTS.Services.Boundaries.prototype.updateBottomLeft = function() {
  if (!this.bottomLeft) return;

  this.bottomLeft.copy(this.getPoint(0, window.innerHeight));
};

RTS.Services.Boundaries.prototype.updateBottomRight = function() {
  if (!this.bottomRight) return;

  this.bottomRight.copy(this.getPoint(window.innerWidth, window.innerHeight));
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

RTS.Services.Boundaries.prototype.checkBoundaries = function() {
  var result = true;

  if (this.topLeft.equals(this.nullVector)) result  =false;
  if (this.topRight.equals(this.nullVector)) result = false;
  if (this.bottomLeft.equals(this.nullVector)) result = false;
  if (this.bottomRight.equals(this.nullVector)) result = false;

  // Remember last valid position
  if (result) {
    this.topLeftOld = this.topLeft.clone();
    this.topRightOld = this.topRight.clone();
    this.bottomRightOld = this.bottomRight.clone();
    this.bottomLeftOld = this.bottomLeft.clone();

    var camera = Vizi.Graphics.instance.camera;
    this.validCameraPosition = camera.position.clone();
  }

  this.insideBounds = result;

  return result;
};

RTS.Services.Boundaries.prototype.getPoint = function(x, y) {
  var match = RTS.Game.instance.currentMatch;

  if (!match) {
    return this.nullVector;
  }

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
    var p = intersects[ 0 ].point;
    return new THREE.Vector3(p.x, 1, p.z);
  }

  return this.nullVector;
};

RTS.Services.Boundaries.instance = null;
Vizi.Services._serviceMap["boundaries"] = { object: RTS.Services.Boundaries };
