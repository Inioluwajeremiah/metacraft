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
