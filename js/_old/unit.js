var Unit = WorldObject.extend({
  init: function(game, name) {
    this._super(game, name);

    this.moving = false;
    this.rotating = false
    this.movementSpeed = 15.0;
    this.rotatingSpeed = 50.0;
    this.startMovingThreshold = 0.3;

    var folder = this.game.gui.addFolder("Unit");
    folder.add(this, 'movementSpeed');
    folder.add(this, 'rotatingSpeed');
    folder.add(this, 'startMovingThreshold');
  },

  onUpdate: function(delta) {
    this._super(delta);

    if (this.rotating) {
      this.turnToTarget(delta);
    }

    if (this.moving) {
      this.makeMove(delta);
    }
  },

  makeMove: function(delta) {
    this.entity.position = THREE.Vector3.MoveTowards(this.entity.position, this.destination, delta * this.movementSpeed);

    if (this.destination.equals(this.entity.position)) {
      this.moving = false;
    }
  },

  turnToTarget: function(delta) {
    var rotation = new THREE.Quaternion();
    var alpha = Math.min(1, this.rotationStep);
    var result = THREE.Quaternion.slerp(this.entity.quaternion, this.destinationRotation, rotation, alpha);

    this.entity.quaternion.copy(rotation);
    this.rotationStep += (delta * this.rotatingSpeed * 0.1);

    if (this.isInMovablePosition()) {
      this.moving = true;
    }

    if (alpha == 1) {
      this.rotating = false;
    }
  },

  isInMovablePosition: function() {
    return Float.compare(this.entity.quaternion.eulerAngle().y, this.destinationRotation.eulerAngle().y, this.startMovingThreshold);
  },

  moveTo: function(destination) {
    this.destination = new THREE.Vector3(destination.x, this.entity.position.y, destination.z);

    var m1 = new THREE.Matrix4();
    m1.lookAt(this.entity.position, this.destination, this.entity.up);

    this.destinationRotation = this.entity.quaternion.clone();
    this.destinationRotation.setFromRotationMatrix(m1);
    this.invertedDestinationRotation = this.destinationRotation.clone().inverse();
    this.rotationStep = 0;
    this.rotating = true;
    this.moving = this.isInMovablePosition();
  }
});
