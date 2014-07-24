RTS.Abilities = {};

RTS.Abilities.Base = function() {
  Vizi.Script.call(this);

  this.network = RTS.Services.Network.instance;
  this.sequenceNumber = 1;
  this.events = [];
};

inherits(RTS.Abilities.Base, Vizi.Script);

RTS.Abilities.Base.prototype.publishEvent = function(type, payload) {
  var me = RTS.HumanPlayer.instance;
  var message = { type: type, data: payload };

  message["_seq"] = this.sequenceNumber++;
  message["_sender"] = this._object._id;
  message["_timestamp"] = (new Date()).getTime();
  message["_player"] = me.id;

  this.events.push(message);

  this.network.sendMessage(message);
};
