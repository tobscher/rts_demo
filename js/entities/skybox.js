function Skybox(scene) {
  this.entity = this.build();

  scene.add(this.entity);
}

Skybox.prototype.build = function() {
  var geometry = new THREE.CubeGeometry(5000,5000,5000);
  var material = new THREE.MeshBasicMaterial( { color: 0x87CEEB, side: THREE.BackSide } );

  var mesh = new THREE.Mesh(geometry, material);

  return mesh;
}
