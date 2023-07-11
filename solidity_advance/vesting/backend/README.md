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


# Vesting Smart Contract

## Contract Overview

The Vesting smart contract is designed to facilitate the vesting of tokens for stakeholders over a specified period. It allows an administrator to add stakeholders, allocate tokens to them, and enables stakeholders to claim their vested tokens based on the vesting schedule.

The contract follows the ERC20 standard interface and includes the following features:

1. Stakeholder Management:
   - The administrator can whitelist stakeholders by specifying their vesting period, allocated tokens, and stakeholder type.
   - Stakeholders are stored in a mapping, allowing easy access to stakeholder information.

2. Token Allocation:
   - The administrator can allocate a specific number of tokens to each stakeholder during the whitelisting process.

3. Vesting Schedule:
   - The contract calculates the number of tokens a stakeholder can claim based on the vesting period and the elapsed time.
   - Tokens are gradually released to stakeholders over the vesting period.

4. Token Claiming:
   - Stakeholders can claim their vested tokens when eligible, as determined by the vesting schedule and available tokens.
   - The `claimTokens` function is used to initiate the token claim process.

## Contract Structure

The `Vesting` smart contract consists of the following components:

### Stakeholder Struct

The `Stakeholder` struct represents a stakeholder and includes the following fields:

- `vestingPeriod`: The duration of the vesting period, specified in seconds from the current block timestamp.
- `tokensAllocated`: The total number of tokens allocated to the stakeholder.
- `tokensClaimed`: The number of tokens already claimed by the stakeholder.
- `stakeholder_type`: A string indicating the type or role of the stakeholder.

### Contract Variables

- `admin`: The address of the contract administrator, who has permission to whitelist stakeholders.
- `token`: An instance of the ERC20 token contract used for token transfers.
- `stakeholders`: A mapping that stores stakeholder addresses and their associated `Stakeholder` struct.
- `addedStakeHolder`: A mapping that keeps track of added stakeholders.

### Events

- `StakeholderAdded`: This event is emitted when a stakeholder is successfully added to the contract. It includes the stakeholder's address and vesting period.
- `TokensClaimed`: This event is emitted when a stakeholder successfully claims tokens. It includes the stakeholder's address and the amount of tokens claimed.

### Modifiers

- `onlyAdmin`: This modifier restricts certain contract functions to be called only by the contract administrator.

### Contract Functions

The `Vesting` contract provides the following functions:

- `WhitelistStakeholder`: This function allows the contract administrator to whitelist a stakeholder by specifying their address, vesting period, allocated tokens, and stakeholder type.

- `calculateTokensToClaim`: This internal function calculates the number of tokens a stakeholder can claim based on the vesting period, tokens allocated, and tokens claimed.

- `claimTokens`: This function allows a stakeholder to claim their vested tokens. It checks if the stakeholder exists, verifies if there are tokens available to claim, transfers the tokens to the stakeholder, and emits the `TokensClaimed` event.

- `isStakeHolderAdded`: This function checks if the caller's address is added as a stakeholder.

- `tokenTOClaim`: This function returns the number of tokens available to claim for the caller's address.

- `tokenTotalSupply`: This function returns the total supply of tokens in the ERC20 token contract.

## Usage

To use the Vesting smart contract:

1. Deploy the contract, passing the address of the ERC20 token contract as a constructor parameter.

2. Use the `WhitelistStakeholder` function to add stakeholders, specifying their details such as address, vesting period, allocated tokens, and stakeholder type.

3. Stakeholders can later call the `claimTokens` function to claim their vested tokens based on the vesting schedule.

4. Use the other provided functions, such as `isStakeHolderAdded`, `tokenTOClaim`, and `tokenTotalSupply`, to retrieve stakeholder information and token-related details.

## Security Considerations

- Ensure that only trusted addresses have the `admin` role, as they have control over adding stakeholders and allocating tokens.

- Double-check the values passed when calling the `WhitelistStakeholder` function to prevent any incorrect allocations or vesting periods.

- Perform thorough testing and auditing of the contract before deploying it in a production environment.

- Take into account the gas costs and potential scalability concerns when dealing with a large number of stakeholders and token transfers.

## Complete Code

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vesting {

    struct Stakeholder {
        uint256 vestingPeriod;
        uint256 tokensAllocated;
        uint256 tokensClaimed;
        string stakeholder_type;
    }

    address public admin;
    IERC20 public token;

    mapping(address => Stakeholder) public stakeholders;
    mapping(address => bool) public addedStakeHolder;

    event StakeholderAdded(address indexed stakeholder, uint256 vestingPeriod);
    event TokensClaimed(address indexed stakeholder, uint256 amount);

    constructor(address tokenAddress) {
        admin = msg.sender;
        token = IERC20(tokenAddress);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function WhitelistStakeholder(address stakeholder, uint256 vestingPeriod, uint _tokens_allocated, uint _token_claimed, string memory _stakeholder_type) external onlyAdmin {
        require(stakeholder != address(0), "Invalid stakeholder address");
        require(vestingPeriod > 0, "Invalid vesting period");
        require(_tokens_allocated > 0, "Tokens allocated must be greater than 1");
        require(_token_claimed <= _tokens_allocated, "Tokens allocated must be greater than or equal to tokens claimed");
        require(bytes(_stakeholder_type).length > 0, "Add stakeholder type");

        uint256 vesting_period = block.timestamp + vestingPeriod;
        stakeholders[stakeholder] = Stakeholder(vesting_period, _tokens_allocated, _token_claimed, _stakeholder_type);
        addedStakeHolder[stakeholder] = true;
        emit StakeholderAdded(stakeholder, vestingPeriod);
    }

   
    function calculateTokensToClaim(Stakeholder storage stakeholder) internal view returns (uint256) {
        uint256 totalTokens = stakeholder.tokensAllocated;
        uint256 tokensClaimed = stakeholder.tokensClaimed;
        uint256 vestingPeriod = stakeholder.vestingPeriod;

       if (vestingPeriod > 0 && tokensClaimed < totalTokens) {
            return tokensClaimed;
        }
    }
     function claimTokens() payable public  {
        Stakeholder storage stakeholder = stakeholders[msg.sender];
        require(stakeholder.vestingPeriod > 0, "Stakeholder not found");
        require(stakeholder.tokensClaimed <= stakeholder.tokensAllocated, "No tokens to claim");

        uint256 tokensToClaim = calculateTokensToClaim(stakeholder);
        stakeholder.tokensClaimed += tokensToClaim;
        token.transfer(msg.sender, tokensToClaim);
        emit TokensClaimed(msg.sender, tokensToClaim);
    }

    function isStakeHolderAddedd () public view returns (bool) {
        return(addedStakeHolder[msg.sender]);
    }

    function tokenTOClaim () public view returns (uint256) {
         Stakeholder storage stakeholder = stakeholders[msg.sender];
         uint256 tokensToClaim = calculateTokensToClaim(stakeholder);
         return(tokensToClaim);
    }
    function tokenTotalSupply () public view returns (uint256) {
        return (token.totalSupply());
    }
}

```

## Author
Inioluwa Adewara
@AdewaraIJ

## License

The Vesting smart contract is licensed under the MIT License.
