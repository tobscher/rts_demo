var Skybox = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var geometry = new THREE.CubeGeometry(5000,5000,5000);
    var material = new THREE.MeshBasicMaterial( { color: 0x87CEEB, side: THREE.BackSide } );

    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }
});
