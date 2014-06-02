var renderer = null
    scene = null,
    camera = null,
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
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 20, -20);
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

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );

  document.body.addEventListener('mousemove', function(e) {
    var mousePos = getMousePos(renderer.domElement, e);
    Input.mouseInsideBounds = true;
    Input.mousePosition = mousePos;
  });

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
  game.add(UserInput);

  run();
});
