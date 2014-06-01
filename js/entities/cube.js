var Cube = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var geometry = new THREE.CubeGeometry(10,4,10);
    var material = new THREE.MeshLambertMaterial( { color: "#cccccc" } );
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0,2,0);

    return mesh;
  }
});
