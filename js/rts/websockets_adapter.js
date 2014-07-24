RTS.WebsocketsAdapter = function(options) {
  options = options || {};
  this.server = options.server || "www.rts.local";

  if (window["WebSocket"]) {
    this.socket = window["WebSocket"];
  } else {
    throw new Error("Websockets are not supported.");
  }
};

RTS.WebsocketsAdapter.prototype.open = function() {
  this.conn = new this.socket("ws://" + this.server  + "/ws");
  this.attachEvents();
};

RTS.WebsocketsAdapter.prototype.attachEvents = function() {
  var that = this;

  this.conn.onopen = function(e) {
    console.log("Websockets connection opened.");

    if (that.onOpen) {
      that.onOpen();
    }
  };

  this.conn.onclose = function(e) {
    console.log("Websockets connection closed.");
  };

  this.conn.onerror = function(e) {
    console.log("A network error occured.", e);
  };

  this.conn.onmessage = function(e) {
    var message = JSON.parse(e.data);
    console.log(message);

    that.onMessage(message);
  };
};

RTS.WebsocketsAdapter.prototype.sendMessage = function(message) {
  var json = JSON.stringify(message);
  this.conn.send(json);
}

RTS.WebsocketsAdapter.prototype.close = function() {
  this.conn.close();
}
