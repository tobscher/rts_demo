var renderer = null
    scene = null,
    camera = null,
    cube = null,
    hero = null
    clock = null;

function animate() {
  var delta = clock.getDelta();
  hero.animate(delta);
}

function run() {
  requestAnimationFrame(function() { run(); });

  renderer.render(scene, camera);

  animate();
}

$(document).ready(function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );

  clock = new THREE.Clock();

  hero = new Hero(scene);

  camera.position.z = 5;

  run();
});
