var Selection = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var radius   = 1,
        segments = 32,
        material = new THREE.LineBasicMaterial( { color: 0x0000ff } ),
        geometry = new THREE.CircleGeometry( radius, segments );

    // Remove center vertex
    geometry.vertices.shift();

    var line = new THREE.Line( geometry, material )
    line.rotation.x = Math.PI / 2;
    line.position.y = 0.6;
    return line;
  }
});
