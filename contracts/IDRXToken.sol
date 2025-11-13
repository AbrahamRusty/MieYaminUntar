// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract IDRXToken is ERC20, Ownable, ERC20Permit {
    constructor() ERC20("IDRX Token", "IDRX") Ownable(msg.sender) ERC20Permit("IDRX Token") {
        // Mint initial supply to owner for testing
        _mint(msg.sender, 1000000 * 10**decimals()); // 1M IDRX
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
