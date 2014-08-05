RTS.PointerLock = function(element) {
  this.element = element;

  this.leftBound = -50;
  this.topBound = -37;
  // Maybe position in the middle of the screen
  this.position = {
    x: 0,
    y: 0
  };
  RTS.PointerLock.instance = this;

  var that = this;
  var onLockChange = function() {
    if(document.pointerLockElement === this.element ||
        document.mozPointerLockElement === this.element ||
        document.webkitPointerLockElement === this.element) {
      console.log('The pointer lock status is now locked');
      document.addEventListener("mousemove", lockLoop, false);
    } else {
      console.log('The pointer lock status is now unlocked');
      document.removeEventListener("mousemove", lockLoop, false);
    }
  };

  var lockLoop = function(e) {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var movementX = e.movementX ||
      e.mozMovementX          ||
      e.webkitMovementX       ||
      0;

    var movementY = e.movementY ||
      e.mozMovementY      ||
      e.webkitMovementY   ||
      0;

    var leftBound = that.leftBound,
        topBound = that.topBound,
        rightBound = width + leftBound,
        bottomBound = height + topBound;

    var newPositionX = that.position.x + movementX;
    var newPositionY = that.position.y + movementY;

    if (newPositionX < leftBound) {
      newPositionX = leftBound;
    }

    if (newPositionX > rightBound) {
      newPositionX = rightBound;
    }

    if (newPositionY < topBound) {
      newPositionY = topBound;
    }

    if (newPositionY > bottomBound) {
      newPositionY = bottomBound;
    }

    that.position.x = newPositionX;
    that.position.y = newPositionY;

    RTS.Cursor.instance.update(that.position);
  };

  document.addEventListener('pointerlockchange', onLockChange, false);
  document.addEventListener('mozpointerlockchange', onLockChange, false);
  document.addEventListener('webkitpointerlockchange', onLockChange, false);
};

RTS.PointerLock.prototype.request = function() {
  this.element.requestPointerLock = this.element.requestPointerLock ||
    this.element.mozRequestPointerLock ||
    this.element.webkitRequestPointerLock;

  this.element.requestPointerLock();
};

RTS.PointerLock.prototype.release = function() {
  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;
};

RTS.PointerLock.prototype.getPosition = function() {
  var width = window.innerWidth / 2;
  var height = window.innerHeight / 2;

  return {
    x: this.position.x,
    y: -this.position.y,
  };
};
