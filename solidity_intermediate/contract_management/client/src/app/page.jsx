'use client'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {ThreeFunctionsAbi} from '../../utils/abi.js';
import {chemAbi} from '../../utils/chemAbi.js'
import {ichAbi} from '../../utils/ichAbi.js'


export default function Home() {

  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [tokenAmount, setTokenAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [balance,  setBalance] = useState(null);
  const [contractTokenBalance,  setContractTokenBalance] = useState(null);

  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [blockAddress, setBlockAddress] = useState('')

  
  // ichToken contract address => 0x830e5B4eb9A440A1B769c960AFb841E8829f66F2
  // ChemToken contract address => 0x1099f648cb1B903bbB5483cf15DeA03Ca74B29cC
  // Phytoken contract address => 0x8e66B5C46c658d1E44335fE3bF8ab186980330aA

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
        const blockAddress = "0x830e5B4eb9A440A1B769c960AFb841E8829f66F2"
        // chem block address = "0x830e5B4eb9A440A1B769c960AFb841E8829f66F2"
        // setBlockAddress(blockAddress)
        // "0x39d393CC041eC3422D0422D232A8592698693966"
        const tfContract = new ethers.Contract(blockAddress, ichAbi, signer);
        setContract(tfContract)

        const symbol = tfContract.symbol();
        const name = tfContract.name();
        const totalSupply = await tfContract.totalSupply();
        const balance = await tfContract.balanceOf(blockAddress);
        setContractTokenBalance(balance.toString())

        setSymbol(symbol);
        setName(name);
        setTotalSupply(totalSupply.toString());

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
        const token_amt = ethers.utils.parseEther(tokenAmount)
        await contract.mintToken(blockAddress, token_amt)
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
          setBalance((await contract.balanceOf(walletAddress)).toNumber());
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
          <p>{name}</p>
          <p>{symbol}</p>
          <p>{totalSupply.toString()}</p>
          <p>{balance}</p>
          <p>{contractTokenBalance}</p>
        </div>
        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>

        <input 
            type="text" 
            placeholder='Recipient address' 
            onChange={(bla) => setBlockAddress(bla.target.value.trim())}
            className=' outline-none p-2 mb-2'
          />

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
