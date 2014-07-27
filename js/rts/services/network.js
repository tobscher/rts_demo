RTS.Services.Network = function(options) {
  // Message buffer
  this.messages = [];
  this.frequency = 100;

  RTS.Services.Network.instance = this;
};

inherits(RTS.Services.Network, Vizi.Service);

RTS.Services.Network.prototype.initialize = function(options) {
  options = options || {};

  var that = this;
  this.adapter = new RTS.WebsocketsAdapter(options);
  this.adapter.onOpen = function() {
    that.opened = true;

    that.sendMessage({type:"connected", data: { name: "Unknown" }});

    setInterval(function() {
      that.transmit();
    }, that.frequency);
  };
  this.adapter.onMessage = function(messages) {
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      var handler = RTS.MessageHandlers.handlers[message.type];

      if (handler) {
        handler.handle(message);
      } else {
        console.warn("Could not find message handler for type:" + message.type);
      }
    }
  };

  this.adapter.open();
};

RTS.Services.Network.prototype.update = function() {
};

RTS.Services.Network.prototype.transmit = function() {
  if (this.messages.length > 0) {
    this.adapter.sendMessage(this.messages.splice(0, this.messages.length));
  }
};

RTS.Services.Network.prototype.terminate = function() {
  this.adapter.close();
};

RTS.Services.Network.prototype.sendMessage = function(message) {
  this.messages.push(message);
};

RTS.Services.Network.instance = null;
Vizi.Services._serviceMap["network"] = { object: RTS.Services.Network };
