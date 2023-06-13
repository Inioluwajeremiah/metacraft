# MyToken

This Solidity program is a simple program that uses the Solidity programming language to demonstrate some smart contract functionalities on minting and burning tokens.

## Description

This program is a simple contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The contract contains some public variables that store the details of MyToken coin, a mapping of addresses to balances (address => uint), a mint function that takes two parameters namely an address and a value and a burn function which is used to destroy tokens.
The mint function increases the total supply by value number passed into the function and increases the balance of the “sender” address by that amount. The burn function takes an address and value just like the mint functions. It then deducts the value from the total supply and from the balance of the “sender”. Lastly, the burn function has a conditionals to make sure the balance of "sender" is greater than or equal to the amount that is supposed to be burned.

## Getting Started

### Executing program

To run this program, you can use Remix, an online Solidity IDE. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create a new file by clicking on the "+" icon in the left-hand sidebar. Save the file with a .sol extension (e.g., MyToken.sol). Copy and paste the following code into the file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/*
       REQUIREMENTS
    1. Your contract will have public variables that store the details about your coin (Token Name, Token Abbrv., Total Supply)
    2. Your contract will have a mapping of addresses to balances (address => uint)
    3. You will have a mint function that takes two parameters: an address and a value. 
       The function then increases the total supply by that number and increases the balance 
       of the “sender” address by that amount
    4. Your contract will have a burn function, which works the opposite of the mint function, as it will destroy tokens. 
       It will take an address and value just like the mint functions. It will then deduct the value from the total supply 
       and from the balance of the “sender”.
    5. Lastly, your burn function should have conditionals to make sure the balance of "sender" is greater than or equal 
       to the amount that is supposed to be burned.
*/

contract MyToken {

    // public variables here
    string public token_name = 'AdewaraToken';
    string public token_symbol = 'ADT';
    uint public total_supply = 0;

    // mapping variable here
      mapping (address => uint) public balance;

    // mint function
    function mint (uint _value, address _address) public {
        total_supply += _value;
        balance[_address] += _value; 
    }
    // burn function
    function burn (uint _value, address _address) public {
         if (balance[_address] >= _value)  {
            total_supply -= _value;
            balance[_address] -= _value;    
        }
    }

}

```

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.18" (or another compatible version), and then click on the "Compile MyToken.sol" button.

Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "MyToken" contract from the dropdown menu, and then click on the "Deploy" button.

Once the contract is deployed, you can interact with it by calling and passing the appropriate arguements the mint and burn functions. Click on the "MyToken" contract in the left-hand sidebar, and then click on the "mint" or "burn" function. Click on the "transact" button to execute the function. Finally, click on the "total_supply" button to retrieve the total amount of token available.

## Authors

Inioluwa Adewara 
[@AdewaraIJ](https://twitter.com/AdewaraIJ)


## License

This project is licensed under the MIT License - see the LICENSE.md file for details















