RTS.FogOfWar = function(options) {
  options = options || {};

  this.size = 1024;

  var game = RTS.Game.instance;
  var fogOfWar = new Vizi.Object();
  fogOfWar.name = "Fog Of War";

  var geometry = new THREE.PlaneGeometry(this.size,this.size);
  var material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    alphaMap: RTS.Minimap.FogOfWar.getTexture(),
    transparent: true
  });

  var mesh = new THREE.Mesh(geometry, material);
  mesh.ignorePick = true;
  mesh.position.y = 1;
  mesh.rotation.x = -Math.PI/2;

  var visual = new Vizi.Visual({
    object: mesh,
    geometry: geometry,
    material: material
  });

  fogOfWar.addComponent(visual);

  return fogOfWar;
};
