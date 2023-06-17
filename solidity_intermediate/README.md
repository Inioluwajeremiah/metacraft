# MyToken

This Solidity program is a simple program that uses the Solidity programming language to demonstrate some smart contract functionalities on the use of the require, assert and revert keywords.

## Description

This program is a simple contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The contract contains some public variables that store the total number of votes, a mapping of addresses to a boolean (address => bool) and a vote function that takes one parameter namely an age.
The vote function increases the total number of votes 1 once the method is called and the conditions are met. 
The revert, rquire keywords print out Age too low and uer already voted if the conditions specified are met.
The assert key word checks if a set of internal errors and that is if the total number of votes is 
as expected and if false the transaction is reversed

## Getting Started

### Executing program

To run this program, you can use Remix, an online Solidity IDE. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create a new file by clicking on the "+" icon in the left-hand sidebar. Save the file with a .sol extension (e.g., MyToken.sol). Copy and paste the following code into the file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    uint256 public totalVoteCounts;
    mapping(address => bool) public hasAddressVoted;

    function vote(uint age) public {

        if (age < 18) {
            /*   
                reverts the current transaction and rolls back any changes made. 
                Gas used to this point is restored to the caller
            */
            revert("Age too low to vote");
        }
        
        /* 
            check if user has not voted. If true any gas used to this point is
            restored to the sender
        */
        require(!hasAddressVoted[msg.sender], "This address has already voted");
        
        /* 
            check if there is internal error and if false, 
            gas spent is not restored to the user 
        */
        assert(totalVoteCounts + 1 > totalVoteCounts);
        
        hasAddressVoted[msg.sender] = true;
        totalVoteCounts += 1;
    }
}


```

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.18" (or another compatible version), and then click on the "Compile FunctionAndError.sol".

Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "Voting" contract from the dropdown menu, and then click on the "Deploy" button.

Once the contract is deployed, you can interact with it by calling and passing the appropriate arguements into the vote function. Click on the "Voting" contract in the left-hand sidebar, and then click on the "vote"  function and passed in the appropriate parameter. Click on the "transact" button to execute the function. Finally, click on the "totalVoteCOunts" button to retrieve the total number of votes.

## Authors

Inioluwa Adewara 
[@AdewaraIJ](https://twitter.com/AdewaraIJ)


## License

This project is licensed under the MIT License - see the LICENSE.md file for details















