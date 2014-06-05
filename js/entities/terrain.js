var Terrain = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.clickCircle = new ClickCircle(game);
    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var geometry = new THREE.BoxGeometry(100,1,100);
    var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
    var material = new THREE.MeshLambertMaterial( { map: floorTexture } );

    return new THREE.Mesh(geometry, material);
  },

  onClick: function(event) {
    if (game.currentlySelected != null) {
      this.clickCircle.show(event.position);
      game.currentlySelected.moveTo(event.position);
    }
  }
});
