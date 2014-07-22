RTS.Resources.Minerals = function(object, options) {
  options = options || {};
  object.name = "Minerals";

  RTS.WorldObject.call(this, object, options);

  object.transform.scale.set(5, 5, 5);
  object.transform.position.set(-40, 0, 0);
  return object;
};

RTS.Resources.Minerals.load = function(loader) {
  loader.loadModel("/js/models/Minerals.js", { type: RTS.Resources.Minerals, options: { radius: 1 } });
};
