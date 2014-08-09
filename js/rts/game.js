RTS.Game = function() {
  // Create Vizi application
  this.container = document.getElementById("container");
  this.app = new Vizi.Application({ container: this.container, displayStats: true, alpha: false });
  this.running = false;

  this.fullscreen = new RTS.Fullscreen(this.container);
  this.cursor = new RTS.Cursor();
  this.gui = new dat.GUI();

  RTS.Game.instance = this;

  this.initializeGame();
};

RTS.Game.instance = null;

RTS.Game.prototype.initializeGame = function() {
  this.addCamera();
  this.addLight();
};

RTS.Game.prototype.addLight = function() {
  var light = new Vizi.Object();
  light.name = "Main Light";

  var directionalLight = new Vizi.DirectionalLight({
    intensity: 1,
    direction: new THREE.Vector3(0, -1, 0)
  });
  directionalLight.position.set(0,1,0);

  light.addComponent(directionalLight);

  this.app.addObject(light);
};

RTS.Game.prototype.addCamera = function() {
  this.cam = new Vizi.PerspectiveCamera({
    active: true,
    fov: 60,
    near: 1,
    far: 10000
  });

  var camera = new Vizi.Object();
  camera.name = "Main Camera";
  camera.addComponent(this.cam);

  this.app.addObject(camera);
};

RTS.Game.prototype.run = function() {
  // Run the app
  this.app.run();
  this.running = true;
};

RTS.Game.prototype.maximize = function() {
  this.fullscreen.request();
};

RTS.Game.prototype.lockPointer = function() {
  this.pointerLock.request();
};

RTS.Game.prototype.releasePointer = function() {
  this.pointerLock.release();
};

RTS.Game.prototype.startMatch = function(match) {
  match.start();
  this.currentMatch = match;
};
