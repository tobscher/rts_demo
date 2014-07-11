RTS.MainController = function(camera, options) {
  options = options || {};
  options.headlight = false;

  var controller = new Vizi.Object();
  var edgeScrollingScript = new RTS.EdgeScrollingScript({ camera: camera });
	var orbitScript = new RTS.OrbitScript({ camera: camera });

  controller.addComponent(edgeScrollingScript);
  controller.addComponent(orbitScript);

  return controller;
};
