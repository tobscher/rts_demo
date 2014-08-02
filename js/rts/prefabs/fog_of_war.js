RTS.FogOfWar = function(options) {
  options = options || {};

  this.size = 1024;

  var game = RTS.Game.instance;
  var fogOfWar = new Vizi.Object();

  var geometry = new THREE.PlaneGeometry(this.size,this.size);
  var material = new THREE.ShaderMaterial({
    uniforms: RTS.HumanPlayer.uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    transparent: true,
    side: THREE.DoubleSide
  });

  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 20;
  mesh.rotation.x = Math.PI/2;

  var visual = new Vizi.Visual({
    object: mesh,
    geometry: geometry,
    material: material
  });

  fogOfWar.addComponent(visual);

  return fogOfWar;
};
