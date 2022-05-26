// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./WrappedAccessControl.sol";

contract CertificatesRouter is WrappedAccessControl {
//contract CertificatesRouter {
    event Created(address to, string ipfsHash, string description);

    address public contractOwner;
    uint public lastId;

    // Structure that store following variables of single certificate
    struct Certificate {
        // Address certificate owner
        address to;
        // IPFS db hash
        string ipfsHash;
        // Any description as string
        string description;
        // Status of certificate
        bool active;
    }

    // List of all certificates
    mapping(uint => Certificate) public certificates;
    mapping(string => bool) ipfsHashes;

    uint constant certificatesRouterVersion = 1;

    constructor() WrappedAccessControl() {
//    constructor() public {
        contractOwner = msg.sender;
    }

    function version() public pure returns (uint) {
        return certificatesRouterVersion;
    }

    function createCertificate(address to, string memory ipfsHash, string memory description) public onlyRole(MANAGER_ROLE) returns (bool) {
//    function createCertificate(address to, string memory ipfsHash, string memory description) public returns (bool) {
        require(!ipfsHashes[ipfsHash], "CertificatesRouter: such a certificate has already been issued before");

        lastId = lastId + 1;
        Certificate memory certificate;
        certificate = certificates[lastId];
        certificate.to = to;
        certificate.ipfsHash = ipfsHash;
        certificate.description = description;
        certificate.active = true;

        ipfsHashes[ipfsHash] = true;

        emit Created(to, ipfsHash, description);
        return true;
    }

    function setCertificate(uint id, address to, string memory ipfsHash, string memory description) public view onlyRole(MANAGER_ROLE) {
//    function setCertificate(uint id, address to, string memory ipfsHash, string memory description) public returns (bool) {
        require(certificates[id].active, "CertificatesRouter: certificate is no active now to change it");
//        require(msg.sender != contractOwner, "CertificatesRouter: you cannot use this method");

        Certificate memory certificate;
        certificate = certificates[id];
        certificate.to = to;
        certificate.ipfsHash = ipfsHash;
        certificate.description = description;
    }

    function setActive(uint id) public view onlyRole(MANAGER_ROLE) {
//    function setActive(uint id) public returns (bool) {
//        require(msg.sender != contractOwner, "CertificatesRouter: you cannot use this method");

        Certificate memory certificate;
        certificate = certificates[id];
        certificate.active = true;
    }

    function setInactive(uint id) public view onlyRole(MANAGER_ROLE) {
//    function setInactive(uint id) public returns (bool) {
//        require(msg.sender != contractOwner, "CertificatesRouter: you cannot use this method");

        Certificate memory certificate;
        certificate = certificates[id];
        certificate.active = false;
    }

    function getCertificate(uint id) public view returns (address to, string memory ipfsHash, string memory description) {
        Certificate memory certificate;
        certificate = certificates[id];
        return (
            certificates[id].to,
            certificates[id].ipfsHash,
            certificates[id].description
        );
    }

    function isActive(uint id) public view returns (bool) {
        Certificate memory certificate;
        certificate = certificates[id];
        return certificate.active;
    }
}
