var renderer = null
    scene = null,
    camera = null,
    projector = null,
    stats = null,
    game = null,
    gui = null;

var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

function animate() {
  var delta = clock.getDelta();

  game.update(delta);

  stats.update();
}

function run() {
  requestAnimationFrame(function() { run(); });

  renderer.render(scene, camera);

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
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x87CEEB, 1, 2500);
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 100, -50);
  camera.lookAt(scene.position);

  // Axis
  var axes = new THREE.AxisHelper(100);
  scene.add(axes);

  // Stats
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  document.body.appendChild(stats.domElement);

  projector = new THREE.Projector();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );

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

  // Events
  THREEx.WindowResize(renderer, camera);

  // terrain = new Terrain(scene);
  // hero = new Hero(scene);
  // var sky = new Skybox(scene);

  game = new Game(scene, camera, gui);
  game.add(Skybox);
  game.add(Sun);
  game.add(Terrain);
  game.add(Cube);
  game.add(CommandCentre);
  game.add(Tank);
  game.add(UserInput);

  run();
});
