RTS.Buildings.CommandCentre = function(object, options) {
  options = options || {};
  object.name = "Command Centre";

  RTS.WorldObject.call(this, object, options);

  object.transform.scale.set(5, 5, 5);
  return object;
};

RTS.Buildings.CommandCentre.load = function(loader) {
  loader.loadModel("js/models/CommandCentre.js", { type: RTS.Buildings.CommandCentre, options: { radius: 2} });
};
