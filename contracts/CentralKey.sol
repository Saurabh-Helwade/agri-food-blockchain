// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract CentralKey {
    address public owner;
    string private centralKey;

    event CentralKeyUpdated(string newKey, address updatedBy);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setCentralKey(string memory newKey) public onlyOwner {
        centralKey = newKey;
        emit CentralKeyUpdated(newKey, msg.sender);
    }

    function getCentralKey() public view returns (string memory) {
        return centralKey;
    }

    function updateCentralKey(string memory newKey) public onlyOwner {
        centralKey = newKey;
        emit CentralKeyUpdated(newKey, msg.sender);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
