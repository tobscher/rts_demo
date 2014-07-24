RTS.Buildings.CommandCentre = function(object, player, options) {
  options = options || {};
  object.name = "Command Centre";

  RTS.WorldObject.call(this, object, options);

  object.transform.scale.set(5, 5, 5);
  object.transform.position.copy(player.startpoint)
  return object;
};

RTS.Buildings.CommandCentre.load = function(loader) {
  loader.loadModel("/js/models/CommandCentre.js", { type: RTS.Buildings.CommandCentre, options: { radius: 1.7} });
};
