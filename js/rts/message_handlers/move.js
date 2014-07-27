RTS.MessageHandlers.Move = function() {
};

RTS.MessageHandlers.Move.prototype.handle = function(message) {
  var me = RTS.HumanPlayer.instance;

  if (message._player == me.id) {
    console.log("Reconcile server command.");
  } else {
    var networkPlayer = RTS.NetworkPlayer.connected[message._player];
    var sender = this.findSender(networkPlayer, message._sender);
    var move = sender.getComponent(RTS.Abilities.Move);
    var position = new THREE.Vector3(message.data.x, message.data.y, message.data.z);

    move.move(position);
  }
};

RTS.MessageHandlers.Move.prototype.findSender = function(networkPlayer, senderId) {
  for (var i = 0; i < networkPlayer.object._children.length; i++) {
    var potentialSender = networkPlayer.object._children[i];

    if (potentialSender.id == senderId) return potentialSender;
  }

  return null;
};

RTS.MessageHandlers.handlers["move"] = new RTS.MessageHandlers.Move();
