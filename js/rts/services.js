RTS.Services = {};

Vizi.Application.prototype.addOptionalServices = function() {
  this.addService("network");
  this.addService("boundaries");
};
