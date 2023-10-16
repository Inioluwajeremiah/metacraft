// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// import { ethers } from "ethers";
const hre = require("hardhat");
const ethers = require("ethers")

async function main() {

  // const value = ethers.utils.parseEther('1'); 
  const ChemToken = await hre.ethers.getContractFactory("ChemToken");
  const chemToken = await ChemToken.deploy();
  await chemToken.deployed();
  
  console.log(`ChemToken contract address => ${chemToken.address}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
