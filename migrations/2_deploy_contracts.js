var PrescriptionNFT = artifacts.require("./PrescriptionNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(PrescriptionNFT, {gas: 5000000});
};
