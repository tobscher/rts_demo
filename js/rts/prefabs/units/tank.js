RTS.Units.Tank = function(object) {
  object.transform.scale.set(5, 5, 5);
  object.transform.position.set(20, 0, 0);
  return object;
};

RTS.Units.Tank.load = function(loader) {
  loader.loadModel("js/models/Tank.js", RTS.Units.Tank);
};

// var Tank = Unit.extend({
//   init: function(game, name) {
//     this._super(game, "Tank");
//   },

//   preload: function() {
//     var scope = this;

//     var loader = new THREE.JSONLoader();
//     loader.load("js/models/Tank.json", function(geometry, materials) {
//       scope.entity = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
//       scope.entity.scale.set(5, 5, 5);
//       scope.entity.position.set(20, 0, 0);
//       scope.entity.rotation.y = Math.PI;

//       game.scene.add(scope.entity);
//       game.index(scope);

//       scope.calculateBounds();
//     });
//   }
// });
