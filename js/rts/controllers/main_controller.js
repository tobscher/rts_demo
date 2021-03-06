RTS.MainController = function(camera, options) {
  options = options || {};

  var controller = new Vizi.Object();
  controller.name = "Main Controller";
  var edgeScrollingScript = new RTS.EdgeScrollingScript({ camera: camera });
  var zoomScript = new RTS.ZoomScript({ camera: camera });

  controller.addComponent(edgeScrollingScript);
  controller.addComponent(zoomScript);

  return controller;
};
