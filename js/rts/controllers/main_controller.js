RTS.MainController = function(camera, options) {
  options = options || {};
  options.headlight = false;

  var controller = new Vizi.Object();
  var edgeScrollingScript = new RTS.EdgeScrollingScript({ camera: camera });
	var zoomScript = new RTS.ZoomScript({ camera: camera });

  controller.addComponent(edgeScrollingScript);
  controller.addComponent(zoomScript);

  return controller;
};
