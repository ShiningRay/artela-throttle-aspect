// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Counter {
    uint256 _count;

    constructor() {
        _count = 0;
    }

    function increment() public {
        _count = _count + 1;
    }

    function count() public view returns (uint256) {
        return _count;
    }
}
