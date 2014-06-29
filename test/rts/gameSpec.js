describe("RTS.Game", function() {
  it("initializes the underlying application", function() {
    spyOn(Vizi, 'Application');
    spyOn(RTS.Game.prototype, 'initializeGame');

    var subject = new RTS.Game();

    expect(subject.app).not.toBe(null);
    expect(RTS.Game.prototype.initializeGame).toHaveBeenCalled();
  });
});
