// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract CreateArmour is AccessControl {

    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");    

    error CallerNotCreator(address caller);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    event WorkCreated(    
        uint128 timeStamp,
        string cid
    );

    struct Work {
        string cid;
        uint timeStamp;
    }

    mapping(address => Work[]) public works;

    function addCreator(address creator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(CREATOR_ROLE, creator);
    }

    function createTimestamp(string calldata _cid) external onlyRole(CREATOR_ROLE){

        Work memory work = Work({
            timeStamp: uint128(block.timestamp),
            cid: _cid
        });

        works[msg.sender].push(work);
    }

    functio
}