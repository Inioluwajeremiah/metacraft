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
