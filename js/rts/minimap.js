RTS.Minimap = {};

RTS.Minimap.Wrapper = function() {
  this.app = Vizi.Application.instance;
  RTS.Minimap.instance = this;

  // Minimap camera width/height
  this.width = 1024;
  this.height = 1024;

  this.addCamera();
  this.addViewport();
  this.addLight();
  this.addFogOfWar();
};

RTS.Minimap.Wrapper.prototype.addCamera = function() {
  var graphics = Vizi.Graphics.instance;

  var mapCamera = new THREE.OrthographicCamera(
      this.width / -2,   // Left
      this.width / 2,    // Right
      this.height / 2,   // Top
      this.height / -2,  // Bottom
      -5000,                  // Near
      10000 );                // Far
  this.layer = graphics.addLayer("minimap", mapCamera, {
    up: new THREE.Vector3(0,0,-1),
    lookAt: new THREE.Vector3(0,-1,0),
    viewport: { x: 10, y: 10, width: 192, height: 192}
  });

  graphics.scene.add(mapCamera);
};

RTS.Minimap.Wrapper.prototype.addViewport = function() {
  this.viewport = new RTS.Minimap.Viewport();
  this.minimapAspect = this.width/192;

  this.app.addObject(this.viewport);
};

RTS.Minimap.Wrapper.prototype.addLight = function() {
  var light = new Vizi.Object({ layer: this.layer });
  light.name = "Light (Minimap)";
  var directionalLight = new Vizi.DirectionalLight({
    intensity: 1,
    direction: new THREE.Vector3(0, -1, 0)
  });
  directionalLight.position.set(0,1,0);

  light.addComponent(directionalLight);

  this.app.addObject(light);
};

RTS.Minimap.Wrapper.prototype.addFogOfWar = function() {
  this.fogOfWar = new RTS.Minimap.FogOfWar();
  this.app.addObject(this.fogOfWar);
};
