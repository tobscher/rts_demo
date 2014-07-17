RTS.Abilities.Move = function(options) {
  options = options || {};
  RTS.Abilities.Base.call(this, options);

  this.moving = false;
  this.rotating = false;
  this.movementSpeed = 15.0;
  this.rotatingSpeed = 50.0;
  this.startMovingThreshold = 0.3;

  this.clock = new THREE.Clock();
};

inherits(RTS.Abilities.Move, RTS.Abilities.Base);

RTS.Abilities.Move.prototype.realize = function() {

};

RTS.Abilities.Move.prototype.update = function() {
  var delta = this.clock.getDelta();

  if (!this.targetPosition) {
    return;
  }

  if (this.rotating) {
    this.turnToTarget(delta);
  }

  if (this.moving) {
    this.makeMove(delta);
  }
};

RTS.Abilities.Move.prototype.turnToTarget = function(delta) {
  var transform = this._object.transform;

  var rotation = new THREE.Quaternion();
  var alpha = Math.min(1, this.rotationStep);

  var result = THREE.Quaternion.slerp(transform.quaternion, this.targetRotation, rotation, alpha);

  transform.quaternion.copy(rotation);
  this.rotationStep += (delta * this.rotatingSpeed * 0.1);

  if (this.isInMovablePosition()) {
    this.moving = true;
  }

  if (alpha == 1) {
    this.rotating = false;
  }
};

RTS.Abilities.Move.prototype.makeMove = function(delta) {
  var transform = this._object.transform;

  transform.position.copy(THREE.Vector3.MoveTowards(transform.position, this.targetPosition, delta * this.movementSpeed));

  if (this.targetPosition.equals(transform.position)) {
    this.moving = false;
  }
};

RTS.Abilities.Move.prototype.isInMovablePosition = function() {
  var transform = this._object.transform;

  return Float.compare(transform.quaternion.eulerAngle().y, this.targetRotation.eulerAngle().y, this.startMovingThreshold);
};

RTS.Abilities.Move.prototype.mapClicked = function(position) {
  var transform = this._object.transform;

  this.targetPosition = new THREE.Vector3(position.x, transform.position.y, position.z);

  var m1 = new THREE.Matrix4();
  m1.lookAt(transform.position, this.targetPosition, transform.up);

  this.targetRotation = transform.quaternion.clone();
  this.targetRotation.setFromRotationMatrix(m1);
  this.rotationStep = 0;
  this.rotating = true;
  this.moving = this.isInMovablePosition();

  this.publishEvent("move", this.targetPosition);
};
