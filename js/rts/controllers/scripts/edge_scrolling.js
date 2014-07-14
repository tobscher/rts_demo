RTS.EdgeScrollingScript = function(options) {
  options = options || {};

  Vizi.Script.call(this, options);

  this._camera = (options.camera !== undefined) ? options.camera : null;
  this.clock = new THREE.Clock();
  this.scrollWidth = 15;
  this.scrollSpeed = 75;
};

inherits(RTS.EdgeScrollingScript, Vizi.Script);

RTS.EdgeScrollingScript.prototype.update = function() {
  if (!this._realized) return;

  this.moveCamera(this.clock.getDelta());
};

RTS.EdgeScrollingScript.prototype.moveCamera = function(delta) {
  var mouseInput = Vizi.Services.input.mouse.state;

  if (mouseInput.x == Vizi.Mouse.NO_POSITION ||
      mouseInput.y == Vizi.Mouse.NO_POSITION ||
      !mouseInput.insideContainer) {
    return;
  }

  var xpos = mouseInput.x;
  var ypos = mouseInput.y;
  var movement = new THREE.Vector3;
  var origin = this._camera.position;

  // Do not check against window
  if (xpos >= 0 && xpos < this.scrollWidth) {
    movement.x -= this.scrollSpeed;
  } else if (xpos <= window.innerWidth && xpos > window.innerWidth - this.scrollWidth) {
    movement.x += this.scrollSpeed;
  }

  // vertical camera movement
  if (ypos >= 0 && ypos < this.scrollWidth) {
    movement.z -= this.scrollSpeed;
  } else if (ypos <= window.innerHeight && ypos > window.innerHeight - this.scrollWidth) {
    movement.z += this.scrollSpeed;
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
