const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DIDRegistryModule", (m) => {
  const id = m.getParameter("id", "did:example:123456789abcdefghi");
  const publicKey = m.getParameter("publicKey", "publicKey");
  const service = m.getParameter("service", "service");
  const proof = m.getParameter("proof", "proof");

  const didRegistry = m.contract("DIDRegistry", []);

  return { didRegistry };
});
