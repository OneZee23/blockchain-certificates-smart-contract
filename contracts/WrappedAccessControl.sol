// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract WrappedAccessControl is AccessControl  {
    bytes32 public constant USER_ROLE = keccak256("USER");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER");

    constructor () {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        require(account != _msgSender(), "WrappedAccAccessControl: can only revoke not self");
        super.revokeRole(role, account);
    }
}
