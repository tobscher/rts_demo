RTS.Game = function() {
  // Create Vizi application
  this.container = document.getElementById("container");
  this.app = new Vizi.Application({ container: this.container, displayStats: true });
  this.running = false;

  RTS.Game.instance = this;

  this.initializeGame();
};

RTS.Game.instance = null;

RTS.Game.prototype.initializeGame = function() {
  this.addLight();
  this.addCamera();
};

RTS.Game.prototype.addLight = function() {
  var light = new Vizi.Object();
  var directionalLight = new Vizi.DirectionalLight({
    intensity: 1,
    direction: new THREE.Vector3(0, -1, 0)
  });
  directionalLight.position.set(0,1,0);
  light.addComponent(directionalLight);

  // Add light to the scene
  this.app.addObject(light);
};

RTS.Game.prototype.addCamera = function() {
  this.cam = new Vizi.PerspectiveCamera({
    active: true,
    fov: 30,
    near: 1,
    far: 10000
  });

  var camera = new Vizi.Object;
  camera.addComponent(this.cam);

  this.app.addObject(camera);
};

RTS.Game.prototype.run = function() {
  // Run the app
  this.app.run();
  this.running = true;
};

RTS.Game.prototype.fullscreen = function() {
  var elem = this.container;
  if (elem.requestFullscreen) {
      elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
  }
};

RTS.Game.prototype.startMatch = function(match) {
  match.start();
  this.currentMatch = match;
};
