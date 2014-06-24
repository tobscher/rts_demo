var renderer = null
    scene = null,
    camera = null,
    projector = null,
    stats = null,
    game = null,
    gui = null,
    mapCamera = null,
    mapWidth = 100,
    mapHeight = 100;

var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

function animate() {
  var delta = clock.getDelta();

  game.update(delta);

  stats.update();
}

function run() {
  requestAnimationFrame(function() { run(); });

  var w = window.innerWidth, h = window.innerHeight;

  renderer.setViewport( 0, 0, w, h );
  renderer.clear();
  renderer.render(scene, camera);

  renderer.setViewport(10, 10, mapWidth, mapHeight );
  renderer.render(scene, mapCamera);

  animate();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}

$(document).ready(function() {
  // Scene
  scene = new THREE.Scene();

  // Fog
  scene.fog = new THREE.Fog(0x87CEEB, 1, 2500);

  // Main Camera
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 100, 50);
  camera.lookAt(scene.position);
  scene.add(camera);

  // Map Camera
  // This should match terrain width/height
  var width = 1000;
  var height = 1000;

  mapCamera = new THREE.OrthographicCamera(
    width / -2,   // Left
    width / 2,    // Right
    height / 2,   // Top
    height / -2,  // Bottom
    -5000,                  // Near
    10000 );                // Far
  mapCamera.up = new THREE.Vector3(0,0,-1);
  mapCamera.lookAt( new THREE.Vector3(0,-1,0) );
  scene.add(mapCamera);

  // Axis
  var axes = new THREE.AxisHelper(100);
  scene.add(axes);

  // Stats
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  document.body.appendChild(stats.domElement);

  // Projectors
  projector = new THREE.Projector();

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);
  renderer.autoClear = false;
  document.body.appendChild( renderer.domElement );

  // Events
  THREEx.WindowResize(renderer, camera);

  document.addEventListener('mousemove', function(e) {
    var mousePos = getMousePos(renderer.domElement, e);
    Input.mouseInsideBounds = true;
    Input.mousePosition = mousePos;
  });

  function MouseWheelHandler(e) {
    e.preventDefault();

    var delta = 0;

    if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
      delta = event.wheelDelta;
    } else if ( event.detail ) { // Firefox
      delta = - event.detail;
    }

    if ( delta > 0 ) {
      game.findByName("UserInput").zoomOut();
    } else {
      game.findByName("UserInput").zoomIn();
    }
  }

  // IE9, Chrome, Safari, Opera
  document.addEventListener("mousewheel", MouseWheelHandler, false);
  // Firefox
  document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

  document.addEventListener('mousedown', function(event) {
    // event.preventDefault();

    var eventData = {};

    var vector = new THREE.Vector3(
       (event.clientX / window.innerWidth ) * 2 - 1,
      -(event.clientY / window.innerHeight ) * 2 + 1,
      0.5);
    projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(game.objects(), true);

    if (intersects.length > 0) {
      eventData["position"] = intersects[0].point;
      //intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
      game.findByObjectId(intersects[0].object.id).onClick(eventData);
    }
  }, false);

  $(window).mouseleave(function() {
    Input.mouseInsideBounds = false;
  });

  // GUI
  gui = new dat.GUI();

  game = new Game(scene, camera, gui);
  // Environment
  game.add(Skybox);
  game.add(Sun);

  // Map
  game.add(Terrain);

  game.add(CommandCentre);
  game.add(Tank);

  run();
});
