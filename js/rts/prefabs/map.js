RTS.Map = function(options) {
  options = options || {};

  var graphics = Vizi.Graphics.instance;
  var map = new Vizi.Object();
  map.name = "Map";
  map.size = 1024;
  map.cameraLock = {
    top: -(map.size / 2 - 112),
    left: -(map.size / 2 - 112),
    right: map.size / 2 - 112,
    bottom: map.size / 2 + 28
  };

  var clickCircle = new RTS.ClickCircle();
  var clickCircleScript = clickCircle.getComponent(RTS.ClickCircleScript);
  map.addChild(clickCircle);

  // Visual
  var geometry = new THREE.BoxGeometry(map.size,1,map.size);
  var floorTexture = new THREE.ImageUtils.loadTexture('img/ground.png');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set( 25, 25 );
  var material = new THREE.MeshLambertMaterial( { map: floorTexture } );

  var visual = new Vizi.Visual({
    geometry: geometry,
    material: material
  });

  map.addComponent(visual);

  // Script
  var mapScript = new RTS.MapScript();
  map.addComponent(mapScript);

  var picker = new Vizi.Picker();
  map.addComponent(picker);

  picker.addEventListener("mousedown", function(e) {
    if (e.button == 2) {
      clickCircleScript.showAt(e.point);

      var selection = RTS.HumanPlayer.instance.selection.selected;

      if (selection.length > 0) {
        var selected = selection[0];
        if (selected.handleMapClicked) {
          selected.handleMapClicked(e.point);
        }
      }
    }
  });

  var fogOfWar = new RTS.FogOfWar();
  map.addChild(fogOfWar);

  map.mini = new RTS.Minimap.Map();

  return map;
};

RTS.MapScript = function(options) {
  options = options || {};

  Vizi.Script.call(this, options);
}

// Scripts require inheritance script
inherits(RTS.MapScript, Vizi.Script);

RTS.MapScript.prototype.realize = function() {
}

RTS.MapScript.prototype.update = function() {
}
