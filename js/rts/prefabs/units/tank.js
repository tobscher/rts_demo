RTS.Units.Tank = function(object, options) {
  options = options || {};
  object.name = "Siege Tank"

  RTS.WorldObject.call(this, object, options);

  object.transform.scale.set(5, 5, 5);
  object.transform.position.set(20, 0, 0);

  var move = new RTS.Abilities.Move();
  object.addComponent(move);

  object.handleMapClicked = function(position) {
    move.mapClicked(position);
  }

  return object;
};

RTS.Units.Tank.load = function(loader) {
  loader.loadModel("/js/models/Tank.js", { type: RTS.Units.Tank, options: { radius: 1 }});
};
