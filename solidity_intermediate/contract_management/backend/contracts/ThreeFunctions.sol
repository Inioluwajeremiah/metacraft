// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ThreeFunctions {

    mapping(address => uint) public balances;
    uint public totalToken;

    constructor(uint _initialToken) {
        balances[msg.sender] = _initialToken;
        totalToken = _initialToken;
    }

    event Transfer(address indexed sender, address indexed recipientAccount , uint transferAount);
    event Mint(address indexed sender, uint amount, uint totalToken);

    // first function: mint token
    function mintToken(uint _tokenAmount) public {
        require(_tokenAmount > 0, "Invalid mint amount");

        balances[msg.sender] += _tokenAmount;
        totalToken += _tokenAmount;

        emit Mint(msg.sender, _tokenAmount, totalToken);
    }
    
    // second function: transfer token 
    function transferToken(address _recipientAccount, uint _transferAmount) public {
        
        require(balances[msg.sender] >= _transferAmount, "Insufficient balance");
        require(_transferAmount > 0, "Invalid transfer transferAmount");

        balances[msg.sender] -= _transferAmount;
        balances[_recipientAccount] += _transferAmount;

        emit Transfer(msg.sender, _recipientAccount, _transferAmount);
    }

    // third function: get balance from input address
    function getBalance(address _account) public view returns (uint) {
        return balances[_account];
    }   
}
