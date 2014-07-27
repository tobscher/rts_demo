RTS.Player = function(options) {
  options = options || {};

  this.object = new Vizi.Object();
  this.id = options.id;
  this.name = options.name;
  this.startpoint = options.startpoint;
  this.location = new THREE.Vector3(this.startpoint.location.x, this.startpoint.location.y, this.startpoint.location.z);
};
