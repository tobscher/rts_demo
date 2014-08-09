function PrintScene() {
  var app = Vizi.Application.instance;

  function printObject(o) {
    console.groupCollapsed(o.name);

    for (var j = 0; j < o._components.length; j++) {
      var c = o._components[j];
      printComponent(c);
    }

    for (var k = 0; k < o._children.length; k++) {
      var c = o._children[k];
      printObject(c);
    }

    console.groupEnd();
  };

  function printComponent(c) {
    var content = c.name;

    if (c.name === undefined) {
      content = c;
    }

    console.log(content);
  };

  for (var i = 0; i < app._objects.length; i++) {
    var o = app._objects[i];

    printObject(o);
  }
};
