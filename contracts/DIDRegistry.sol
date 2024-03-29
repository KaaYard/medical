pragma solidity ^0.8.0;

contract DIDRegistry {
    struct DIDDocument {
        string id;
        string addre;
        string proof;
    }

    mapping(string => DIDDocument) public dids;

    function createDIDDocument(
        string memory _id,
        string memory _addre,
        string memory _proof
    ) public {
        dids[_id] = DIDDocument(_id, _addre, _proof);
    }

    function getDIDDocument(
        string memory _id
    ) public view returns (string memory, string memory, string memory) {
        DIDDocument memory doc = dids[_id];
        return (doc.id, doc.addre, doc.proof);
    }
}
