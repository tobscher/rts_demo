RTS.EdgeScrollingScript = function(options) {
  options = options || {};

  Vizi.Script.call(this, options);

  this._camera = (options.camera !== undefined) ? options.camera : null;
  this.clock = new THREE.Clock();
  this.scrollWidth = 15;
  this.scrollSpeed = 100;

  this.lockedLeft = false;
  this.lockedRight = false;
  this.lockedTop = false;
  this.lockedDown = false;
};

inherits(RTS.EdgeScrollingScript, Vizi.Script);

RTS.EdgeScrollingScript.prototype.update = function() {
  if (!this._realized) return;

  this.moveCamera(this.clock.getDelta());
};

RTS.EdgeScrollingScript.prototype.moveCamera = function(delta) {
  var mouseInput = Vizi.Services.input.mouse.state;
  var boundaries = RTS.Services.Boundaries.instance;

  if (mouseInput.x == Vizi.Mouse.NO_POSITION ||
      mouseInput.y == Vizi.Mouse.NO_POSITION ||
      !mouseInput.insideContainer) {
    return;
  }

  var xpos = mouseInput.x;
  var ypos = mouseInput.y;

  var left = (xpos >= 0 && xpos < this.scrollWidth);
  var right = (xpos <= window.innerWidth && xpos > window.innerWidth - this.scrollWidth);
  var top = (ypos >= 0 && ypos < this.scrollWidth);
  var down = (ypos <= window.innerHeight && ypos > window.innerHeight - this.scrollWidth);

  // Reset camera if outside of map
  if (!boundaries.insideBounds) {
    boundaries.resetBoundaries();

    this.lockedLeft = left;
    this.lockedRight = right;
    this.lockedTop = top;
    this.lockedDown = down;

    return;
  }
  var movement = new THREE.Vector3;
  var origin = this._camera.position.clone();

  // Do not check against window
  if (left && !this.lockedLeft) {
    movement.x -= this.scrollSpeed;
    this.lockedRight = false;
  } else if (right && !this.lockedRight) {
    this.lockedLeft = false;
    movement.x += this.scrollSpeed;
  }

  // vertical camera movement
  if (top && !this.lockedTop) {
    movement.z -= this.scrollSpeed;
    this.lockedDown = false;
  } else if (down && !this.lockedDown) {
    movement.z += this.scrollSpeed;
    this.lockedTop = false;
  }

  // calculate desired camera position based on received input
  var destination = origin.clone();
  destination.x += movement.x * delta;
  destination.z += movement.z * delta;

  // if a change in position is detected perform the necessary update
  if (!destination.equals(origin)) {
    this._camera.position.copy(destination);
  }
};
