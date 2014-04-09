var renderer = null
    scene = null,
    camera = null,
    hero = null,
    stats = null,
    terrain = null;

var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

function animate() {
  var delta = clock.getDelta();
  var moveDistance = 200 * delta;
  var rotateAngle = Math.PI / 2 * delta;

  // move forwards/backwards/left/right
  if ( keyboard.pressed("W") )
    hero.entity.translateZ( -moveDistance );
  if ( keyboard.pressed("S") )
    hero.entity.translateZ(  moveDistance );
  if ( keyboard.pressed("Q") )
    hero.entity.translateX( -moveDistance );
  if ( keyboard.pressed("E") )
    hero.entity.translateX(  moveDistance ); 

  // rotate left/right/up/down
  var rotation_matrix = new THREE.Matrix4().identity();
  if ( keyboard.pressed("A") )
    hero.entity.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
  if ( keyboard.pressed("D") )
    hero.entity.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
  if ( keyboard.pressed("R") )
    hero.entity.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
  if ( keyboard.pressed("F") )
    hero.entity.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);

  var relativeCameraOffset = new THREE.Vector3(0,50,200);

  var cameraOffset = relativeCameraOffset.applyMatrix4(hero.entity.matrixWorld);

  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt(hero.entity.position);

  stats.update();
}

function run() {
  requestAnimationFrame(function() { run(); });

  renderer.render(scene, camera);

  animate();
}

$(document).ready(function() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x87CEEB, 1, 2500);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

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

  terrain = new Terrain(scene);
  hero = new Hero(scene);
  var sky = new Skybox(scene);

  run();
});
