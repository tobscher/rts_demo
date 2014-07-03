RTS.Game = function() {
  // Create Vizi application
  var container = document.getElementById("container");
  this.app = new Vizi.Application({ container: container });
  this.running = false;

  this.initializeGame();
};

RTS.Game.prototype.initializeGame = function() {
  this.addLight();
  this.addCamera();
  this.addController();

  // Override camera position from controller
  this.cam.position.set(0, 100, 50);
  this.cam.lookAt(new THREE.Vector3(0,0,0));
};

RTS.Game.prototype.addController = function() {
  var controller = Vizi.Prefabs.ModelController({active:true});
  var controllerScript = controller.getComponent(Vizi.ModelControllerScript);
  controllerScript.camera = this.cam;
  this.app.addObject(controller);
};

RTS.Game.prototype.addLight = function() {
  var light = new Vizi.Object;
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

RTS.Game.prototype.startMatch = function(match) {
  match.start();
  this.currentMatch = match;
}
