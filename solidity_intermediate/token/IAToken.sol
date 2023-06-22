// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract IAToken is ERC20 {
    address private _owner;

    constructor() ERC20("IAToken", "IAT") {
        _owner = msg.sender;
    }


    modifier onlyOwner() {
        require(msg.sender == _owner, "Accesss given to contract owner only");
        _;
    }

    event TransferEvent(address indexed sender, address indexed recipientAccount , uint transferAount);
    event Mint(address indexed sender, uint amount);
    event Burn(address indexed burn_address, uint burn_amount);

    // mint token function
    function mintToken(address recipientAddress, uint256 mintAmount) public onlyOwner {
        _mint(recipientAddress, mintAmount);
        emit Mint(msg.sender, mintAmount);
    }

    // transfer token function
    function transferToken(address recipientAddress, uint256 transferAmount) public {
        _transfer(msg.sender, recipientAddress, transferAmount);
        
        emit TransferEvent(msg.sender, recipientAddress, transferAmount);
    }

    // burn token function
    function burnToken(uint256 amount) public {
        _burn(msg.sender, amount);

        emit Burn(msg.sender, amount);
    }

}
