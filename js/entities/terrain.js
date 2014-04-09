function Terrain(scene) {
  this.entity = this.build();

  scene.add(this.entity);
}

Terrain.prototype.build = function(scene) {
  var geometry = new THREE.CubeGeometry(9000,1,9000);
  var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
  // floorTexture.wrapS = floorTexture.floorTexturewrapT = THREE.RepeatWrapping;
  // floorTexture.repeat.set(1, 10);
  var material = new THREE.MeshBasicMaterial( { map: floorTexture } );

  return new THREE.Mesh(geometry, material);
}

Terrain.prototype.animate = function(delta) {
};
