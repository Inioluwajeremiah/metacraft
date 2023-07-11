export const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "stakeholder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "vestingPeriod",
        "type": "uint256"
      }
    ],
    "name": "StakeholderAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "stakeholder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokensClaimed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "stakeholder",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "vestingPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_tokens_allocated",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_token_claimed",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_stakeholder_type",
        "type": "string"
      }
    ],
    "name": "WhitelistStakeholder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "addedStakeHolder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isStakeHolderAddedd",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "stakeholders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "vestingPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokensAllocated",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokensClaimed",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "stakeholder_type",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenTOClaim",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenTotalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
