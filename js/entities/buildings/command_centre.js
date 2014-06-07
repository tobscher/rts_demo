var CommandCentre = Building.extend({
  init: function(game, name) {
    this._super(game, "Command Centre");
  },

  preload: function() {
    var scope = this;

    var loader = new THREE.JSONLoader();
    loader.load("js/models/CommandCentre.json", function(geometry, materials) {
      scope.entity = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
      scope.entity.rotation.y = Math.PI / 1.5;
      scope.entity.scale.set(5, 5, 5);

      game.scene.add(scope.entity);

      scope.calculateBounds();
    });
  }
});
