var Terrain = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var geometry = new THREE.CubeGeometry(100,1,100);
    var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
    // floorTexture.wrapS = floorTexture.floorTexturewrapT = THREE.RepeatWrapping;
    // floorTexture.repeat.set(1, 10);
    var material = new THREE.MeshBasicMaterial( { map: floorTexture } );

    return new THREE.Mesh(geometry, material);
  }
});
