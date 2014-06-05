var CommandCentre = Building.extend({
  init: function(game, name) {
    this._super(game, "Command Centre");
  },

  build: function() {
    var commandCentre = new THREE.Object3D();

    var material = new THREE.MeshLambertMaterial( { color: "#cccccc" } );
    var floor1Geometry = new THREE.BoxGeometry(10,4,10);
    var floor2Geometry = new THREE.BoxGeometry(5,4,5);
    var floor1 = new THREE.Mesh(floor1Geometry, material)
    floor1.position.set(0,2,0);

    var floor2 = new THREE.Mesh(floor2Geometry, material)
    floor2.position.set(0,6,0);

    commandCentre.add(floor1);
    commandCentre.add(floor2);

    commandCentre.position.set(-20, 0, 0);

    return commandCentre;
  }
});
