// var SCROLL_WIDTH = 15;
// var SCROLL_SPEED = 25;
// var ROTATE_SPEED = 100;

// var MIN_CAMERA_HEIGHT = 10;
// var MAX_CAMERA_HEIGHT = 40;

var UserInput = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.scrollWidth = 15;
    this.scrollSpeed = 25;

    this.game.gui.add(this, 'scrollWidth');
    this.game.gui.add(this, 'scrollSpeed');
  },

  onUpdate: function(delta) {
    if (typeof(Input.mousePosition) == 'undefined') return;
    if (typeof(Input.mouseInsideBounds) == 'undefined') return;
    if (!Input.mouseInsideBounds) return;

    this.moveCamera(delta);
    this.rotateCamera(delta);
  },

  moveCamera: function(delta) {
    var xpos = Input.mousePosition.x;
    var ypos = Input.mousePosition.y;
    var movement = new THREE.Vector3(0,0,0);

    if(xpos >= 0 && xpos < this.scrollWidth) {
        movement.x -= this.scrollSpeed;
    } else if(xpos <= window.innerWidth && xpos > window.innerWidth - this.scrollWidth) {
        movement.x += this.scrollSpeed;
    }

    // vertical camera movement
    if(ypos >= 0 && ypos < this.scrollWidth) {
        movement.z -= this.scrollSpeed;
    } else if(ypos <= window.innerHeight && ypos > window.innerHeight - this.scrollWidth) {
        movement.z += this.scrollSpeed;
    }

    // make sure movement is in the direction the camera is pointing
    // but ignore the vertical tilt of the camera to get sensible scrolling
    // movement = game.mainCamera.transform.TransformDirection(movement);
    // movement.y = 0;

    // away from ground movement
    // movement.y -= ResourceManager.ScrollSpeed * Input.GetAxis("Mouse ScrollWheel");

    // calculate desired camera position based on received input
    var origin = game.mainCamera.position;
    var destination = origin.clone();
    destination.x -= movement.x;
    destination.y -= movement.y;
    destination.z -= movement.z;

    // limit away from ground movement to be between a minimum and maximum distance
    // if(destination.y > MAX_CAMERA_HEIGHT) {
    //   destination.y = MAX_CAMERA_HEIGHT;
    // } else if(destination.y < MIN_CAMERA_HEIGHT) {
    //   destination.y = MIN_CAMERA_HEIGHT;
    // }

    // if a change in position is detected perform the necessary update
    if (destination != origin) {
      game.mainCamera.position.lerp(destination, 0.1 * delta * this.scrollSpeed);
    }
  },

  rotateCamera: function() {
  }
});