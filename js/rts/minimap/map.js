// TODO: Replace with image
RTS.Minimap.Map = function(options) {
  options = options || {};

  this.size = 1024;

  var minimap = RTS.Minimap.instance;
  var map = new Vizi.Object({layer: minimap.layer});
  map.name = "Map (Minimap)";

  // Visual
  var geometry = new THREE.BoxGeometry(this.size,1,this.size);
  var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set( 25, 25 );
  var material = new THREE.MeshLambertMaterial({
    map: floorTexture
  });

  var visual = new Vizi.Visual({
    geometry: geometry,
    material: material
  });

  map.addComponent(visual);

  return map;
};
