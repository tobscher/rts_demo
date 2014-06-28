RTS.Game = function() {

};

RTS.Game.prototype.start = function() {
  // Create Vizi application
  var container = document.getElementById("container");
  var app = new Vizi.Application({ container: container });

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
  app.addObject(cube);
  app.addObject(light);

  // Run the app
  app.run();
};
