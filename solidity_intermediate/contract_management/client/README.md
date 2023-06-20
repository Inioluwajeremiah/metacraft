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

# ThreeFunctions

## Description
This technical documentation provides an overview and explanation of the frontend code implemented in the Next JS component Home. The code enables users to interact with the ThreeFunctions contract deployed on the Polygon Mumbai testnet using the MetaMask wallet.

## Dependencies
The code utilizes the following dependencies:
react: A JavaScript library for building user interfaces.
ethers: A library for interacting with Ethereum.
ThreeFunctionsAbi: A custom ABI (Application Binary Interface) for the ThreeFunctions contract.

## Component Structure
The Home component is a functional component implemented using React's useState hook. It consists of several state variables to track the component's state and handle user inputs.

The component contains the following state variables:

loading: A boolean value indicating whether an action is currently being processed.
walletAddress: A string representing the user's wallet address.
contract: An instance of the ThreeFunctions contract.
tokenAmount: A string representing the amount of tokens to be minted.
recipientAddress: A string representing the recipient's wallet address for token transfers.
transferAmount: A number representing the amount of tokens to be transferred.
balance: A number representing the user's token balance.

## Functions
The Home component provides the following functions to handle user interactions:

ConnectWallet(): This function is called when the user clicks the "Connect Wallet" button. It checks if MetaMask is installed and requests the user's account address. It then initializes the Ethereum provider, signer, and the contract instance using the provided ABI (ThreeFunctionsAbi). If MetaMask is not installed, an alert is displayed.

MintToken(): This function is called when the user clicks the "Mint token" button. It checks if the contract instance exists and if a token amount is provided. If both conditions are met, it calls the mintToken function of the contract, which mints new tokens. After a successful transaction, an alert is displayed.

TransferToken(): This function is called when the user clicks the "Transfer token" button. It checks if the contract instance exists, if a transfer amount is provided, and if a recipient address is provided. If all conditions are met, it calls the transferToken function of the contract, which transfers tokens from the user's account to the recipient's account. After a successful transaction, an alert is displayed.

GetBalance(): This function is called when the user clicks the "Get Balance" button. It checks if the contract instance exists. If so, it calls the getBalance function of the contract to retrieve the token balance of the user's account. The balance is stored in the balance state variable and displayed on the screen.

## User Interface
The component renders a user interface with the following elements:

Balance Display: A heading element that displays the user's token balance. If the balance variable is not null, the balance is shown. Otherwise, a "Get Balance" button is displayed to allow the user to fetch their balance.

Wallet Address Display: A heading element that displays the user's wallet address. If the walletAddress variable is not empty, the wallet address is shown. Otherwise, a "Connect Wallet" button is displayed to allow the user to connect their wallet.

Mint Token Section: A section that allows the user to mint new tokens. It includes an input field for entering the amount of tokens to mint and a "Mint token" button to initiate the minting process.

Transfer Token Section: A section that allows the user to transfer tokens to another address.

## Complete code: 
```javascript
'use client'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {ThreeFunctionsAbi} from '../../utils/abi.js';

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [tokenAmount, setTokenAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [balance,  setBalance] = useState(null);

  const ConnectWallet = async () => {
    setLoading(false)
    try {
        setLoading(true)

      if(window.ethereum) {
        
         // set account
        const getAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // await provider.send("eth_requestAccounts", []);
        setWalletAddress(getAccounts[0])

        // get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // get signer
        const signer = provider.getSigner();
        const blockAddress = "0x39d393CC041eC3422D0422D232A8592698693966"
        const tfContract = new ethers.Contract(blockAddress, ThreeFunctionsAbi, signer);
        setContract(tfContract)
      } else {
        alert('Install wallet to continue')
      }
      
    } catch (error) {
      alert("Error initializing contract");   
    }
  }

  const MintToken = async () => {
    setLoading(false)
    try {
      if (!contract) {
        alert("Connect wallet to continue")
      }
      else if (!tokenAmount) {
        alert("input token amount")
      }
      else {
        // const parsedAmount = ethers.utils.parseEther(tokenAmount)
        await contract.mintToken(tokenAmount)
        setLoading(false);
        alert(`token (${tokenAmount}) minted successfully`)
      }
      
    } catch (error) {
      console.error(error); 
    }

  }

    const TransferToken = async () => {
      setLoading(false)
      try {
        if (!contract) {
          alert("Connect wallet to continue")
        }
        else if (!transferAmount) {
          alert("input amount to transfer")
        }
        else if (!recipientAddress) {
          alert("input recipient address")
        }
        else {
          
          // const parsedAmount = ethers.utils.parseEther(transferAmount)
          await contract.transferToken(recipientAddress, transferAmount)
          setLoading(false);
          alert(`token(${transferAmount}) transferred successsfully`)
        }
        
      } catch (error) {
        console.error(error); 
      }
    }

    const GetBalance = async () => {
      console.log(contract);
        if (!contract) {
          alert("Connect wallet to continue")
        }
        else if (!walletAddress) {
          alert("Connect wallet to continue")
        }
        else {
       
          setBalance((await contract.getBalance(walletAddress)).toNumber());
          
        }
    }


  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className='w-[30rem] border border-[#ddd] pb-12'>
        <div className='w-full flex flex-row justify-around shadow-md p-4 items-center'>
          {balance ? 
            <h1 className=' text-purple-800 font-bold'>{balance }</h1>
           : 
           <button className=' bg-purple-800 text-white border-0 rounded-lg px-4 py-2 text-center'
           onClick={GetBalance} >Get Balance</button>
          }
          
          { walletAddress ?  <h1 className=' text-purple-800 font-bold'>{walletAddress.slice(0,5)}...{walletAddress.slice(walletAddress.length - 5, walletAddress.length )}</h1>
            :
            <button className=' bg-purple-800 text-white border-0 rounded-lg px-4 py-2 text-center'
            onClick={ConnectWallet} >Connect Wallet</button>
          }
        </div>
        
        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>
          <input type="number" 
            placeholder='Enter amount to mint' 
            onChange={(amt) => setTokenAmount(amt.target.value.trim())}
            className=' outline-none p-2'
          />
          <button 
            onClick={MintToken} 
            className=' bg-purple-800 text-white mt-4 p-2 rounded-md'>Mint token</button>
        </div>

        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>
          <input 
            type="number" 
            placeholder='Enter amount to transfer' 
            onChange={(trf) => setTransferAmount(trf.target.value.trim())}
            className=' outline-none p-2'
          />
          <input 
            type="text" 
            placeholder='Enter recipient address' 
            onChange={(adr) => setRecipientAddress(adr.target.value.trim())}
            className=' outline-none p-2 mt-2'
          />
          <button 
            onClick={TransferToken}
            className=' bg-purple-800 text-white mt-4 p-2 rounded-md'
            >Transfer token</button>
        </div>

      </div>
      
    </main>
  )
}

```






