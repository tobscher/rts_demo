describe("Vector3", function() {
  describe("MoveTowards", function() {
    it("moves one unit on each axis", function() {
      var v1 = new THREE.Vector3(1,1,1);
      var v2 = new THREE.Vector3(2,2,2);
      var v3 = new THREE.Vector3(5,5,5);

      expect(THREE.Vector3.MoveTowards(v1, v2, 1)).toEqual(v2);
      expect(THREE.Vector3.MoveTowards(v1, v2, 0.5)).toEqual(new THREE.Vector3(1.5, 1.5, 1.5));
      expect(THREE.Vector3.MoveTowards(v1, v3, 1)).toEqual(v2);
    });

    it("does not exceed the end value", function() {
      var v1 = new THREE.Vector3(1,1,1);

      expect(THREE.Vector3.MoveTowards(v1, v1, 1)).toEqual(v1);
    });

    it("handles negative values", function() {
      var v1 = new THREE.Vector3(10,10,10);
      var v2 = new THREE.Vector3(5,5,5);
      var v3 = new THREE.Vector3(5,-20,-5);

      expect(THREE.Vector3.MoveTowards(v1, v2, 1)).toEqual(new THREE.Vector3(9,9,9));
      expect(THREE.Vector3.MoveTowards(v1, v3, 1)).toEqual(new THREE.Vector3(9,9,9));
    });
  });
});
