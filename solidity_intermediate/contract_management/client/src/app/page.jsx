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
