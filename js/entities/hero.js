function Hero(scene) {
  this.duration = 5;
  this.entity = this.build();

  scene.add(this.entity);
}

Hero.prototype.build = function() {
  var geometry = new THREE.CubeGeometry(20,70,20);
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 70;

  return mesh;
}

Hero.prototype.animate = function(delta) {
  // var fract = delta / this.duration;
  // var angle = Math.PI * 2 * fract;

  // this.entity.rotation.y += angle;
};
