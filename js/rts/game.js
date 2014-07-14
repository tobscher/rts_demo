RTS.Game = function() {
  // Create Vizi application
  var container = document.getElementById("container");
  this.app = new Vizi.Application({ container: container, displayStats: true });
  this.running = false;

  RTS.Game.instance = this;

  this.initializeGame();
};

RTS.Game.instance = null;

RTS.Game.prototype.initializeGame = function() {
  this.addLight();
  this.addCamera();
  this.addController();
};

RTS.Game.prototype.addController = function() {
  this.controller = new RTS.MainController(this.cam);

  this.app.addObject(this.controller);
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

  // Override camera position from controller
  this.cam.position.set(0, 100, 50);
  this.cam.lookAt(Vizi.Services.graphics.scene.position);

  var camera = new Vizi.Object;
  camera.addComponent(this.cam);

  this.app.addObject(camera);
};

RTS.Game.prototype.run = function() {
  // Run the app
  this.app.run();
  this.running = true;
};

RTS.Game.prototype.startMatch = function(match) {
  match.start();
  this.currentMatch = match;
};
