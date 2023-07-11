This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Vesting Smart Contract - Client

This documentation provides an overview and usage guide for the client code that interacts with the Vesting smart contract.

## Overview

The client code is written in React and facilitates the interaction with the Vesting smart contract. It allows users to connect their wallet, register stakeholders, and claim tokens. The client code utilizes the ethers.js library to interact with the smart contract functions.

## Code Structure

The client code consists of the following key components:

- State Variables: The client code uses state variables to manage the connection status, wallet address, contract instance, stakeholder details, and loading statuses.

- ConnectWallet: This function is responsible for connecting the user's wallet to the client code. It sets the wallet address and initializes the contract instance.

- WhitelistStakeHolder: This function is used to register a stakeholder by calling the `WhitelistStakeholder` function of the Vesting smart contract. It validates the input fields and triggers the stakeholder registration process.

- ClaimToken: This function allows stakeholders to claim their vested tokens by calling the `claimTokens` function of the Vesting smart contract.

## Usage

To use the client code, follow these steps:

1. Install the required dependencies:
   - React: The client code is built using React, so make sure you have React installed in your project.

2. Import the required dependencies:
   - Import the `useEffect` and `useState` hooks from the React library.
   - Import the `ethers` library from the ethers.js framework.
   - Import the `abi` variable containing the ABI (Application Binary Interface) of the Vesting smart contract.

3. Initialize the State Variables:
   - Declare state variables for the connection status, wallet address, contract instance, stakeholder details, and loading statuses.

4. Implement the ConnectWallet function:
   - This function connects the user's wallet to the client code by using the `eth_requestAccounts` method provided by the Ethereum provider.
   - Set the wallet address and initialize the contract instance using the `ethers.providers.Web3Provider` and `ethers.Contract` classes.

5. Implement the WhitelistStakeHolder function:
   - Validate the input fields to ensure they are not empty.
   - Parse the input values using the `ethers.utils.parseEther` method to convert them to the appropriate format.
   - Call the `WhitelistStakeholder` function of the Vesting smart contract with the stakeholder address, vesting period, allocated tokens, claimed tokens, and stakeholder type.
   - Handle any errors that occur during the stakeholder registration process.

6. Implement the ClaimToken function:
   - Check if the wallet address is available.
   - Call the `claimTokens` function of the Vesting smart contract to allow stakeholders to claim their vested tokens.
   - Handle any errors that occur during the token claiming process.

7. Integrate the client code into your React components:
   - Use the state variables and functions in your React components to manage the connection status, stakeholder registration, and token claiming.

## Dependencies

The client code requires the following dependencies:

- React: The JavaScript library for building user interfaces.
- ethers.js: A JavaScript library for interacting with Ethereum.

Ensure that you have these dependencies installed and configured correctly in your project.

## Code

```
'use client'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {abi} from './VestingABI.js'

// input fields

export default function Home() {

  const [connectionLoading, setConnectionLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState();

  // register organization
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [stakeholderAddress, setStakeholderAddress] = useState("");
  const [stakeholderType, setStakeholderType] = useState("");
  const [vestingPeriod, setVestingPeriod] = useState(0);
  const [tokensClaimed, setTokensClaimed] = useState('');
  const [tokensAllocated, setTokensAllocated] = useState('')
  const [claimLoading, setClaimLoading] = useState(false);

  // ichToken contract address => 0x830e5B4eb9A440A1B769c960AFb841E8829f66F2
  // ChemToken contract address => 0x1099f648cb1B903bbB5483cf15DeA03Ca74B29cC
  // Phytoken contract address => 0x8e66B5C46c658d1E44335fE3bF8ab186980330aA

  useEffect(() => {
    if (window.ethereum.setWalletAddress) {
      ConnectWallet();
    }
  }, [])

  const ConnectWallet = async () => {
    setConnectionLoading(true)
    try {
      if(window.ethereum) {
         // set account
        const getAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // await provider.send("eth_requestAccounts", []);
        setWalletAddress(getAccounts[0])

        // get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // get signer
        const signer = provider.getSigner();
        const contractAddress = "0x1Df2Df7FB8Db37140A560ebDAad75310f0dB24e9"
        const vestingContract = new ethers.Contract(contractAddress, abi, signer);
        console.log("vestingContract => ", vestingContract);
        
        setContract(vestingContract)
        setConnectionLoading(false)
      } else {
        alert('Install wallet to continue');
        setConnectionLoading(false)
      }
    } catch (error) {
      alert("Error initializing contract", error.reason);   
      setConnectionLoading(false)
    }
  }


  const WhitelistStakeHolder = async () => {

    if (!walletAddress) {
      alert("connect wallet to continue")
    }
    else if (!stakeholderAddress) {
      alert("Input stakeholder address")
    }
    else if (!vestingPeriod) {
      alert ("Input vesting period")
    } 
    else if (!tokensAllocated ) {
      alert ("Input tokens allocated")
    } 
    else if (!tokensClaimed) {
      alert ("Input tokens claimed")
    } 
    else if (!stakeholderType) {
      alert("Input stakeholder type")
    }
    else {
      setRegistrationLoading(true)
        console.log( stakeholderAddress, vestingPeriod, tokensAllocated, tokensClaimed, stakeholderType);
          const vp = ethers.utils.parseEther(vestingPeriod.toString())
          const ta = ethers.utils.parseEther(tokensAllocated)
          const tc = ethers.utils.parseEther(tokensClaimed)
            try{
              const whitelistStakeHolder = await contract.WhitelistStakeholder(
                stakeholderAddress, vp, ta, tc, stakeholderType                
              );
              whitelistStakeHolder.wait();
              setRegistrationLoading(false)
              
            } catch (error) {

              console.log('create vesting error => ', error.message);
              setRegistrationLoading(false)
            } 
    }

  }
 
  const ClaimToken = async () => {
    if (!walletAddress) {
      alert("connect wallet to continue")
    }
    else {
      setClaimLoading(true)
      try {
        const claimtoken = await contract.claimTokens();
        claimtoken.wait();
        setClaimLoading(false)
      } catch (error) {
        alert(error.reason)
        console.log(error);
        setClaimLoading(false)
      }
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className='w-[30rem] border border-[#ddd] pb-12'>

        {/* header */}
        <div className='w-full flex flex-row justify-around shadow-md p-4 items-center'>
          <h1>Vesting Schedule</h1>
          <button className='bg-purple-800 text-white border-0 rounded-lg px-4 py-2 text-center'
            onClick={ConnectWallet}
          >
            {
             connectionLoading ? "Loading..." : walletAddress ? `${walletAddress.slice(0,5)}...${walletAddress.slice(walletAddress.length-4, walletAddress.length)}`
              : "Connect Wallet"
            }
          </button>
        </div>
        
        {/* add organization */}
        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>
          <h1>Add Organization Token Details</h1>
          <input type="text" 
              placeholder='Enter stakeholder address' 
              onChange={(adr) => setStakeholderAddress(adr.target.value.trim())}
              className=' outline-none p-2 mt-3'
          />
          <input type="number" 
            placeholder='Enter vesting period' 
            onChange={(vp) => setVestingPeriod(parseInt(vp.target.value.trim()))}
            className=' outline-none p-2 mt-3'
          />
          <input type="number" 
            placeholder='Enter token allocated' 
            onChange={(tka) => setTokensAllocated(tka.target.value.trim())}
            className=' outline-none p-2 mt-3'
          />
           <input type="number" 
            placeholder='Enter token claimeded' 
            onChange={(stc) => setTokensClaimed(stc.target.value.trim())}
            className=' outline-none p-2 mt-3'
          />
           <input type="text" 
            placeholder='Enter stakeholder type' 
            onChange={(stt) => setStakeholderType(stt.target.value.trim())}
            className=' outline-none p-2 mt-3'
          />
          <button 
            onClick={WhitelistStakeHolder} 
            className=' bg-purple-800 text-white mt-4 p-2 rounded-md'>
             {registrationLoading ? "Loading..." : "Register Stakeholder"}
          </button>
        </div>  
        {/* ends register organization */}


        {/* claim token */}
        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>
          <h1>Claim Token</h1>
          <button 
            onClick={ClaimToken} 
            className=' bg-purple-800 text-white mt-4 p-2 rounded-md'>
              {claimLoading ? "Loading..." : "Claim Token"}
          </button>
        </div>
        {/* ends claim token */}

      </div>
      
    </main>
  )
}

```

## Author
Inioluwa Adewara
@AdewaraIJ

## License

The client code for the Vesting smart contract is available under the MIT License.
