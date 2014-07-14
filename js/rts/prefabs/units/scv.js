RTS.Units.SCV = function(object, options) {
  options = options || {};
  object.name = "SCV"

  RTS.WorldObject.call(this, object, options);

  object.transform.scale.set(5, 5, 5);
  object.transform.position.set(0, 0, 20);

  var move = new RTS.Abilities.Move();
  object.addComponent(move);

  object.handleMapClicked = function(position) {
    move.mapClicked(position);
  }

  return object;
};

RTS.Units.SCV.load = function(loader) {
  loader.loadModel("js/models/SCV.js", { type: RTS.Units.SCV, options: { radius: 0.8 }});
};
