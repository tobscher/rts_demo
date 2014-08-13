RTS.Buildings.CommandCentre = function(object, player, options) {
  options = options || {};
  object.name = options.name;

  RTS.WorldObject.call(this, object, player, options);

  // Commands
  object.commands.push(new RTS.Commands.BuildSCV(object));

  // Abilities
  var training = new RTS.Abilities.Training();
  object.addChild(training);

  object.train = function(build) {
    training.push(build);
  };

  // Transform
  object.transform.scale.set(5, 5, 5);
  return object;
};

RTS.Buildings.CommandCentre.load = function(loader, options) {
  options["radius"] = 1.7;
  options["width"] = 20;
  options["depth"] = 20;
  options["sight"] = 200;

  loader.loadModel("js/models/CommandCentre.js", { type: RTS.Buildings.CommandCentre, options: options });
};
