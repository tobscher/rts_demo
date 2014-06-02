var Tank = Unit.extend({
  init: function(game, name) {
    this._super(game, "Tank");

    this.entity = this.build();
    game.scene.add(this.entity);
  },

  build: function() {
    var radius = 0.3;
    var segmentsWidth = 32;

    var tank = new THREE.Object3D();

    // Material
    var material = new THREE.MeshLambertMaterial( { color: "#dddddd" } );

    // Geometries
    var bodyGeometry = new THREE.CubeGeometry(3,0.5,1.5);
    var turretGeometry = new THREE.CubeGeometry(1,1,1);
    var muzzleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);

    // Meshes
    var leftTread = new Capsule(material,
        radius,
        new THREE.Vector3(1.5, 0.6, -0.8),
        new THREE.Vector3(-1.5, 0.6, -0.8));

    var rightTread = new Capsule(material,
        radius,
        new THREE.Vector3(1.5, 0.6, 0.8),
        new THREE.Vector3(-1.5, 0.6, 0.8));

    var body = new THREE.Mesh(bodyGeometry, material)
    body.position.set(0,0.65,0);
    body.rotation.set(0,0,0);

    var turret = new THREE.Mesh(turretGeometry, material)
    turret.position.set(0,1.35,0);
    turret.rotation.set(0,0,0);

    var muzzle = new THREE.Mesh(muzzleGeometry, material)
    muzzle.position.set(0.8,1.5,0);
    muzzle.rotation.set(0,0,Math.PI/2);

    tank.add(body);
    tank.add(leftTread);
    tank.add(rightTread);
    tank.add(turret);
    tank.add(muzzle);

    tank.rotation.y = Math.PI/4;

    return tank;
  }
});
