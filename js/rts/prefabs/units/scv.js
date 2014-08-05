RTS.Units.SCV = function(object, player, options) {
  options = options || {};
  object.name = options.name;

  RTS.WorldObject.call(this, object, player, options);

  object.transform.scale.set(5, 5, 5);

  var move = new RTS.Abilities.Move();
  object.addComponent(move);

  object.handleMapClicked = function(position) {
    move.mapClicked(position);
  }

  return object;
};

RTS.Units.SCV.load = function(loader, options) {
  options["radius"] = 0.8;

  loader.loadModel("js/models/SCV.js", { type: RTS.Units.SCV, options: options });
};
