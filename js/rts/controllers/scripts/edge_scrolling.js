RTS.EdgeScrollingScript = function(options) {
  options = options || {};

  Vizi.Script.call(this, options);

  this._camera = (options.camera !== undefined) ? options.camera : null;
  this.clock = new THREE.Clock();
  this.scrollSpeed = 100;
  this.scrollTolerance = 1;
};

inherits(RTS.EdgeScrollingScript, Vizi.Script);

RTS.EdgeScrollingScript.prototype.update = function() {
  if (!this._realized) return;

  this.moveCamera(this.clock.getDelta());
};

RTS.EdgeScrollingScript.prototype.moveCamera = function(delta) {
  var mouseInput = Vizi.Services.input.mouse.state;
  var boundaries = RTS.Services.Boundaries.instance;
  var game = RTS.Game.instance;

  var match = game.currentMatch;
  var map = match.map;
  var cameraLock = map.cameraLock;

  var cursor = RTS.Cursor.instance;
  var cursorName = "cursor";

  if (mouseInput.x == Vizi.Mouse.NO_POSITION ||
      mouseInput.y == Vizi.Mouse.NO_POSITION ||
      !mouseInput.insideContainer) {
    return;
  }

  var xpos = mouseInput.x;
  var ypos = mouseInput.y;

  var innerWidth = window.innerWidth - 1 - this.scrollTolerance;
  var innerHeight = window.innerHeight - 1 - this.scrollTolerance;

  var left = xpos <= this.scrollTolerance;
  var right = xpos >= innerWidth;
  var top = ypos <= this.scrollTolerance;
  var down = ypos >= innerHeight;

  if (top) cursorName = cursorName + "-top";
  if (down) cursorName = cursorName + "-bottom";
  if (left) cursorName = cursorName + "-left";
  if (right) cursorName = cursorName + "-right";
  cursor.set(cursorName);

  var movement = new THREE.Vector3;
  var origin = this._camera.position.clone();

  // Do not check against window
  if (left) {
    movement.x -= this.scrollSpeed;
  } else if (right) {
    movement.x += this.scrollSpeed;
  }

  // vertical camera movement
  if (top) {
    movement.z -= this.scrollSpeed;
  } else if (down) {
    movement.z += this.scrollSpeed;
  }

  // calculate desired camera position based on received input
  var destination = origin.clone();
  destination.x += movement.x * delta;
  destination.z += movement.z * delta;

  // if a change in position is detected perform the necessary update
  if (!destination.equals(origin)) {
    // Move camera lock into separate class and apply check
    if (destination.x < cameraLock.left) destination.x = cameraLock.left;
    if (destination.x > cameraLock.right) destination.x = cameraLock.right;
    if (destination.z < cameraLock.top) destination.z = cameraLock.top;
    if (destination.z > cameraLock.bottom) destination.z = cameraLock.bottom;

    this._camera.position.copy(destination);
  }
};
