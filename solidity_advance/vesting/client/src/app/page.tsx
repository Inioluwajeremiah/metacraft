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