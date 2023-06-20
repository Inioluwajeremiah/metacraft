# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

# ThreeFunctions Contract

# Description
The ThreeFunctions contract is a basic implementation of a token contract with three main functions: minting tokens, transferring tokens, and checking the balance of an account.

## SPDX License Identifier
```solidity
// SPDX-License-Identifier: MIT
```
The SPDX License Identifier specifies the license under which the contract is distributed. In this case, it is the MIT license.

## Pragma Directive
```solidity
pragma solidity ^0.8.17;
The pragma directive specifies the Solidity compiler version. The contract is written for version 0.8.17 or a compatible version.
```
## State Variables
```solidity
mapping(address => uint) public balances;
uint public totalToken;
```
balances: A mapping that associates an address with a token balance. It stores the token balance for each address.
totalToken: A uint variable that represents the total supply of tokens.

## Constructor
```solidity
constructor(uint _initialToken) {
        balances[msg.sender] = _initialToken;
        totalToken = _initialToken;
    }
```
The constructor is executed once during the contract deployment. It initializes the contract's state variables.
_initialToken: The initial supply of tokens. It is assigned to the msg.sender address.

## Events
```solidity
event Transfer(address indexed sender, address indexed recipientAccount, uint transferAmount);
event Mint(address indexed sender, uint amount, uint totalToken);
```
Transfer: Triggered when tokens are transferred from one account to another. It emits the sender's address, recipient account address, and the transferred amount.
Mint: Triggered when new tokens are minted. It emits the sender's address, the minted amount, and the updated total supply of tokens.

## Functions
#### mintToken
This function allows the contract owner to mint additional tokens.
```solidity
  function mintToken(uint _tokenAmount) public {
        require(_tokenAmount > 0, "Invalid mint amount");

        balances[msg.sender] += _tokenAmount;
        totalToken += _tokenAmount;

        emit Mint(msg.sender, _tokenAmount, totalToken);
    }
```

_tokenAmount: The amount of tokens to be minted.
It requires that the _tokenAmount is greater than 0.
Increases the token balance of the msg.sender by _tokenAmount.
Updates the totalToken by adding _tokenAmount.
Emits a Mint event with the sender's address, minted amount, and the updated total supply.

#### transferToken
This function allows users to transfer tokens from their account to another account.
```solidity
  function transferToken(address _recipientAccount, uint _transferAmount) public {
        
        require(balances[msg.sender] >= _transferAmount, "Insufficient balance");
        require(_transferAmount > 0, "Invalid transfer transferAmount");

        balances[msg.sender] -= _transferAmount;
        balances[_recipientAccount] += _transferAmount;

        emit Transfer(msg.sender, _recipientAccount, _transferAmount);
    }
```
_recipientAccount: The address of the recipient account.
_transferAmount: The amount of tokens to be transferred.
It requires that the sender's balance is greater than or equal to _transferAmount.
It requires that the _transferAmount is greater than 0.
Decreases the sender's balance by _transferAmount.
Increases the recipient's balance by _transferAmount.
Emits a Transfer event with the sender's address, recipient account address, and the transferred amount.

#### getBalance
This function allows users to retrieve the token balance of a specific account.
``` solidity
function getBalance(address _account) public view returns (uint) {
        return balances[_account];
}
``` 
_account: The address of the account to check the balance for.
Returns the token balance of the specified _account.

## Complete code

``` solidity
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
```






