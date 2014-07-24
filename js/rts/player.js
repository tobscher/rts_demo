RTS.Player = function(options) {
  options = options || {};

  this.id = options.id !== undefined ? options.id : guid();
  this.name = options.name !== undefined ? options.name : "Unknown Player";
  this.object = new Vizi.Object();
  this.startpoint = new THREE.Vector3(options.startpoint.x, options.startpoint.y, options.startpoint.z);
};
