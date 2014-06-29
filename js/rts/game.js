RTS.Game = function() {
  // Create Vizi application
  var container = document.getElementById("container");
  this.app = new Vizi.Application({ container: container });
  this.running = false;

  this.initializeGame();
};

RTS.Game.prototype.initializeGame = function() {
  // Create a phong-shaded cube
  var cube = new Vizi.Object;
  var visual = new Vizi.Visual({
    geometry: new THREE.CubeGeometry(2,2,2),
    material: new THREE.MeshPhongMaterial({ color: 0xcccccc })
  });
  cube.addComponent(visual);

  // Add rotation behaviour
  var rotator = new Vizi.RotateBehavior({autoStart:true});
  cube.addComponent(rotator);

  // Rotate cube to demonstrate 3D
  cube.transform.rotation.x = Math.PI / 5;

  // Create light to show shading
  var light = new Vizi.Object;
  light.addComponent(new Vizi.DirectionalLight);

  // Add cube and light to the scene
  this.app.addObject(cube);
  this.app.addObject(light);
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
