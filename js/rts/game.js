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
  this.addCamera();
  this.addHUD();
  this.addMinimap();
  this.addLight();
};

RTS.Game.prototype.addHUD = function() {
  var graphics = Vizi.Graphics.instance;

  var hudCamera = new THREE.PerspectiveCamera( 45,
    		this.container.offsetWidth / 220, 1, 10000 );
  this.hudLayer = graphics.addLayer("hud", hudCamera, {
    viewport: { x: 0, y: 0, width: this.container.offsetWidth, height: 220 },
    position: new THREE.Vector3(0, 0, 10),
    clearColor: { color: 0x444444, alpha: 1 }
  });
};

RTS.Game.prototype.addLight = function() {
  var light = new Vizi.Object();
  var lightMini = new Vizi.Object({ layer: this.mapLayer });

  function newLightComponent() {
    var directionalLight = new Vizi.DirectionalLight({
      intensity: 1,
      direction: new THREE.Vector3(0, -1, 0)
    });
    directionalLight.position.set(0,1,0);

    return directionalLight
  }

  light.addComponent(newLightComponent());
  lightMini.addComponent(newLightComponent());

  // Add light to the scene
  this.app.addObject(light);
  this.app.addObject(lightMini);
};

RTS.Game.prototype.addCamera = function() {
  this.cam = new Vizi.PerspectiveCamera({
    active: true,
    fov: 40,
    near: 1,
    far: 10000
  });

  var camera = new Vizi.Object;
  camera.addComponent(this.cam);

  this.app.addObject(camera);
};

RTS.Game.prototype.addMinimap = function() {
  var graphics = Vizi.Graphics.instance;

  var width = 1024;
  var height = 1024;
  var mapCamera = new THREE.OrthographicCamera(
      width / -2,   // Left
      width / 2,    // Right
      height / 2,   // Top
      height / -2,  // Bottom
      -5000,                  // Near
      10000 );                // Far
  this.mapLayer = graphics.addLayer("minimap", mapCamera, {
    up: new THREE.Vector3(0,0,-1),
    lookAt: new THREE.Vector3(0,-1,0),
    viewport: { x: 10, y: 10, width: 192, height: 192}
  });

  graphics.scene.add(mapCamera);

  this.minimap = new RTS.Minimap.Viewport();
  this.minimapAspect = width/192;
  this.app.addObject(this.minimap);
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
