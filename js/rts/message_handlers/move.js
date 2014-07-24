RTS.MessageHandlers.Move = function() {
};

RTS.MessageHandlers.Move.prototype.handle = function(message) {
  var me = RTS.HumanPlayer.instance;

  if (message._player == me.id) {
    console.log("Reconcile server command.");
  } else {
    var networkPlayer = RTS.NetworkPlayer.connected[message._player];
  }
};

RTS.MessageHandlers.handlers["move"] = new RTS.MessageHandlers.Move();
