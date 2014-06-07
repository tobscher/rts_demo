var UserInput = GameObject.extend({
  init: function(game) {
    this._super(game, "UserInput");

    this.scrollWidth = 15;
    this.scrollSpeed = 50;
    this.minCameraHeight = 50;
    this.maxCameraHeight = 120;

    this.targetCameraHeight = game.mainCamera.position.y;

    this.game.gui.add(this, 'scrollWidth');
    this.game.gui.add(this, 'scrollSpeed');
    this.game.gui.add(this.game.mainCamera.position, 'y');
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
    var origin = game.mainCamera.position;

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
    destination.x -= movement.x * delta;
    destination.y = this.targetCameraHeight;
    destination.z -= movement.z * delta;

    if (destination.y > this.maxCameraHeight) {
      destination.y = this.maxCameraHeight;
    } else if (destination.y < this.minCameraHeight) {
      destination.y = this.minCameraHeight;
    }

    // if a change in position is detected perform the necessary update
    if (!destination.equals(origin)) {
      this.game.mainCamera.position.copy(destination);
    }
  },

  rotateCamera: function() {
  },

  zoomIn: function() {
    this.zoom(-1);
  },

  zoomOut: function() {
    this.zoom(1);
  },

  zoom: function(direction) {
    var newHeight = this.targetCameraHeight + direction;

    if (newHeight > this.maxCameraHeight) return;
    if (newHeight < this.minCameraHeight) return;

    this.targetCameraHeight = newHeight;
  }
});
