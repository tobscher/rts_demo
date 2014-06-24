var Terrain = GameObject.extend({
  init: function(game) {
    this._super(game);

    this.clickCircle = new ClickCircle(game);
    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var geometry = new THREE.BoxGeometry(1000,1,1000);
    var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 25, 25 );
    var material = new THREE.MeshLambertMaterial( { map: floorTexture } );

    return new THREE.Mesh(geometry, material);
  },

  onClick: function(event) {
    if (this.game.player.currentlySelected != null) {
      this.clickCircle.show(event.position);
      this.game.player.currentlySelected.moveTo(event.position);
    }
  }
});
