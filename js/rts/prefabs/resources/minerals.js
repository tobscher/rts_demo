RTS.Resources.Minerals = function(object, player, options) {
  options = options || {};
  object.name = "Minerals";

  RTS.WorldObject.call(this, object, options);

  object.transform.scale.set(5, 5, 5);
  object.transform.position.set(-40, 0, 0).add(player.location);
  return object;
};

RTS.Resources.Minerals.load = function(loader) {
  loader.loadModel("/js/models/Minerals.js", { type: RTS.Resources.Minerals, options: { radius: 1 } });
};
