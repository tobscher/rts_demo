describe("RTS.Game", function() {
  beforeEach(function() {
    spyOn(Vizi, 'Application');
    spyOn(RTS.Game.prototype, 'initializeGame');

    this.subject = new RTS.Game();
  });

  it("initializes the underlying application", function() {
    expect(this.subject.app).not.toBe(null);
    expect(this.subject.running).toBe(false);
    expect(RTS.Game.prototype.initializeGame).toHaveBeenCalled();
  });

  describe("run", function() {
    it("sets the running state to true", function() {
      var fakeApp = function() {
        this.run = function() {}
      };

      var appInstance = new fakeApp();

      spyOn(appInstance, 'run');

      this.subject.app = appInstance;
      this.subject.run();

      expect(appInstance.run).toHaveBeenCalled();
      expect(this.subject.running).toBe(true);
    });
  });
});
