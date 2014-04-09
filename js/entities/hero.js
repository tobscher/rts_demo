function Hero() {
  this.duration = 5;
  this.entity = this.build();

  scene.add(this.entity);
}

Hero.prototype.build = function(scene) {
  var geometry = new THREE.CubeGeometry(1,1,1);
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

  return new THREE.Mesh(geometry, material);
}

Hero.prototype.animate = function(delta) {
  var fract = delta / this.duration;
  var angle = Math.PI * 2 * fract;

  this.entity.rotation.y += angle;
};
