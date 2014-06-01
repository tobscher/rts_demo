var Sun = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var light = new THREE.DirectionalLight();
    light.position.set(100, 400, 100);

    return light;
  }
});
