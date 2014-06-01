var Terrain = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var geometry = new THREE.CubeGeometry(100,1,100);
    var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
    var material = new THREE.MeshLambertMaterial( { map: floorTexture } );

    return new THREE.Mesh(geometry, material);
  }
});
