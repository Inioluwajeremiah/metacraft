# IAToken Contract

## Description
The IAToken contract is an ERC20-compliant token contract built on the Ethereum blockchain. It extends the functionality of the OpenZeppelin's ERC20 contract. The contract allows for the creation, transfer, and burning of tokens. It also includes an ownership mechanism to restrict certain functions to the contract owner.

## Prerequisites
To use the IAToken contract, the following prerequisites must be met:

Solidity version: ^0.8.19
OpenZeppelin Contracts library: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol

## Contract Details
The IAToken contract includes the following key features:

Contract Ownership: The contract has an owner who is the initial deployer of the contract. Only the contract owner can perform certain restricted operations.

Token Minting: The contract owner can mint new tokens by calling the mintToken function. This function increases the token balance of the specified recipient address by the specified mint amount.

Token Transfer: The transferToken function allows any address to transfer tokens to another address. It decreases the sender's token balance and increases the recipient's token balance by the specified transfer amount.

Token Burning: The burnToken function enables any address to burn their own tokens. This function decreases the token balance of the caller by the specified burn amount.

Events: The contract emits the following events to provide transparency and allow for easy tracking of token transfers and operations:

TransferEvent: Fired when tokens are transferred from one address to another. It provides information about the sender, recipient, and the transferred amount.
Mint: Fired when new tokens are minted. It provides information about the sender and the minted amount.
Burn: Fired when tokens are burned. It provides information about the burner and the burned amount.

## Modifiers
The IAToken contract includes the following modifier:
onlyOwner: This modifier restricts access to functions that can only be executed by the contract owner. It ensures that only the owner can perform specific operations.




## Full code
```solidity
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
```

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.19" (or another compatible version), and then click on the "Compile IAToken.sol" button.

Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "MyToken" contract from the dropdown menu, and then click on the "Deploy" button.

Once the contract is deployed, you can interact with it by calling and passing the appropriate arguements the mint, transferToken and burn functions. Click on the "IAToken" contract on the left-hand sidebar, and then click on the "mint", "transferToken", "burn" function and other functions inherited from the openzapellin ERC20 contract. Click on the "transact" button to execute these functions. You can also perform the following interactions with the smart contract; check total supply, name, decimal, symbol etc.

## Authors

Inioluwa Adewara 
[@AdewaraIJ](https://twitter.com/AdewaraIJ)


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
