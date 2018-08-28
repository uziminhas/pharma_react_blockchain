var PrescriptionNFT = artifacts.require("./PrescriptionNFT.sol");

contract("Prescription", function(accounts) {
  var prescriptionInstance;

  it("initializes with zero prescriptions", function() {
    return PrescriptionNFT.deployed().then(function(instance) {
      return instance.prescriptionCount();
    }).then(function(count) {
      assert.equal(count, 0);
    });
  });

  it("prescribed event is called", function() {
      return PrescriptionNFT.deployed().then(function(instance) {
        prescriptionInstance = instance;
        return prescriptionInstance.prescribe(
          0x000000000000000000000000000000000000000,
          "testMedicationName",
          "testBrandName",
          0,
          "testDosageUnit",
          0,
          0,
          0x000000000000000000000000000000000000000
          );
      }).then(function(receipt){
        assert.equal(receipt.logs.length, 1, "an event was triggered");
    });
  });

  it("prescription count is incremented after prescribing", function() {
      return PrescriptionNFT.deployed().then(function(instance) {
        prescriptionInstance = instance;
        return prescriptionInstance.prescribe(
          0x000000000000000000000000000000000000000,
          "testMedicationName",
          "testBrandName",
          0,
          "testDosageUnit",
          0,
          0,
          0x000000000000000000000000000000000000000
          );
      }).then(function(receipt){
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        return prescriptionInstance.prescriptions(1);
      }).then(function(prescription) {
        var prescriptionCount = prescription[0];
        assert.equal(prescriptionCount, 1, "increments the prescription count");
    });
  });

  it("prescription name is recorded in state", function() {
      return PrescriptionNFT.deployed().then(function(instance) {
        prescriptionInstance = instance;
        return prescriptionInstance.prescribe(
          0x000000000000000000000000000000000000000,
          "testMedicationName",
          "testBrandName",
          0,
          "testDosageUnit",
          0,
          0,
          0x000000000000000000000000000000000000000
          );
      }).then(function(receipt){
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        return prescriptionInstance.prescriptions(1);
      }).then(function(prescription) {
        var medicationName = prescription[2];
        assert.equal(medicationName, "testMedicationName", "correct medication name is recorded");
    });
  });

  it("prescription dosage is recorded in state", function() {
      return PrescriptionNFT.deployed().then(function(instance) {
        prescriptionInstance = instance;
        return prescriptionInstance.prescribe(
          0x000000000000000000000000000000000000000,
          "testMedicationName",
          "testBrandName",
          0,
          "testDosageUnit",
          0,
          0,
          0x000000000000000000000000000000000000000
          );
      }).then(function(receipt){
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        return prescriptionInstance.prescriptions(1);
      }).then(function(prescription) {
        var dosageUnit = prescription[5];
        assert.equal(dosageUnit, "testDosageUnit", "correct dosage unit is recorded");
    });
  });

});


