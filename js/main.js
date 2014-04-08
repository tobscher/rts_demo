var renderer = null,
  scene = null, 
  camera = null,
  cube = null;

var duration = 5000;
var currentTime = Date.now();
function animate() {
  var now = Date.now();
  var deltat = now - currentTime;
  currentTime = now;
  var fract = deltat / duration;
  var angle = Math.PI * 2 * fract;
  cube.rotation.y += angle;
}

function run() {
  requestAnimationFrame(function() { run(); });

  // Render the scene
  renderer.render( scene, camera );

  // Spin the cube for next frame
  animate();
}

$(document).ready(function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.CubeGeometry(1,1,1);
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  run();
});
