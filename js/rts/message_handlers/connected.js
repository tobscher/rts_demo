RTS.MessageHandlers.Connected = function() {
};

RTS.MessageHandlers.Connected.prototype.handle = function(message) {
  var me = RTS.HumanPlayer.instance;
  var game = RTS.Game.instance;

  if (me === undefined) {
    me = new RTS.HumanPlayer({
      id: message.data.id,
      name: message.data.name,
      startpoint: message.data.startpoint
    });
    game.currentMatch.addPlayer(me);
  }

  for (var i = 0; i < message.data.players.length; i++) {
    var player = message.data.players[i];

    // That's me
    if (player.id == me.id) continue;

    // Add network player unless already added
    if (RTS.NetworkPlayer.connected[player.id] === undefined) {
      var networkPlayer = new RTS.NetworkPlayer({
        id: player.id,
        name: player.name,
        startpoint: player.startpoint
      });
      game.currentMatch.addPlayer(networkPlayer);
    }
  }
};

RTS.MessageHandlers.handlers["connected"] = new RTS.MessageHandlers.Connected();
