const CentralKey = artifacts.require("CentralKey");

module.exports = function (deployer) {
  deployer.deploy(CentralKey);
};
