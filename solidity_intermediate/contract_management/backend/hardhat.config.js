require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
    },
    "polygon_mumbai": {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: "0.8.18",
};
