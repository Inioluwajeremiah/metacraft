'use client'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {abi} from './VestingABI.js'

export default function Home() {

  const [connectionLoading, setConnectionLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState();
  const [contract, setContract] = useState();
  const [balance,  setBalance] = useState(null);

  // register organization
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");

  // vesting schedule
  const [vestingLoading, setVestingLoading] = useState(false);
  const [organizationTokenAddress, setOrganizationTokenAddress] = useState("");
  const [stakeholderAddress, setStakeholderAddress] = useState("");
  const [stakeholderType, setStakeholderType] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [releaseTime, setReleaseTime] = useState(0);
  const [vestingPeriod, setVestingPeriod] = useState(0);
  const [releasedTokens, setReleasedTokens] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0)

  // claim token
  const [claimLoading, setClaimLoading] = useState(false);
  const [orgTokenAddress, setOrgTokenAddress] = useState("");

  // ichToken contract address => 0x830e5B4eb9A440A1B769c960AFb841E8829f66F2
  // ChemToken contract address => 0x1099f648cb1B903bbB5483cf15DeA03Ca74B29cC
  // Phytoken contract address => 0x8e66B5C46c658d1E44335fE3bF8ab186980330aA

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
        const contractAddress = '0x388dF641Dcfa18012447a6A4945e69C03243fb99';
        const vestingContract = new ethers.Contract(contractAddress, abi, signer);
        console.log("vestingContract => ", vestingContract);
        
        setContract(vestingContract)
        setConnectionLoading(false)
      } else {
        alert('Install wallet to continue');
        setConnectionLoading(false)
      }
    } catch (error) {
      alert("Error initializing contract");   
      setConnectionLoading(false)
    }
  }

  // const RegisterOrganization = async () => {

  //   if (!walletAddress) {
  //     alert("connect wallet to continue")
  //   }
  //   else if (!tokenAddress) {
  //     alert("Input token address")
  //   }
  //   else if (!tokenName) {
  //     alert("Input a valid token name")
  //   }
  //   else if (!tokenSymbol || tokenSymbol.length > 8) {
  //     alert ("Input a valid token symbol")
  //   } else {
  //     setRegistrationLoading(true)
  //     try {
  //       const registerOrganization = await contract.RegisterOrganization(tokenAddress, tokenName, tokenSymbol);
  //       registerOrganization.wait();
  //       setRegistrationLoading(false)
  //     } catch (error) {
  //       alert(error)
  //       setRegistrationLoading(false)
  //     }
      
  //   }
  // }

  const addStakeHolder = async () => {

    if (!walletAddress) {
      alert("connect wallet to continue")
    }
    // else if (!organizationTokenAddress) {
    //   alert("Input organization token address")
    // }
    else if (!stakeholderAddress) {
      alert("Input stakeholder address")
    }
    else if (!stakeholderType) {
      alert ("Input stake holde type")
    } 
    else if (!totalSupply) {
      alert ("Input stake holde type")
    } 
    else if (!startTime ) {
      alert ("Set start date")
    } 
    else if (timediff <= 0 ) {
      alert ("Invalid release time, must be greater than start time")
    }
    else if (!vestingPeriod) {
      alert ("Vesting period must be greater than 0")
    }
    else if (!releasedTokens) {
      alert ("Input released tokens")
    }
    else {
      setVestingLoading(true)
      try {  
        console.log( organizationTokenAddress, stakeholderAddress, stakeholderType, 
          totalSupply, startTime, releaseTime, vestingPeriod, releasedTokens);

          const organization_details = await contract.getOrganization(organizationTokenAddress);
          console.log("organization_details => ",organization_details[0]);
          if (organization_details[0].length > 1) {

            try{
              const registerOrganization = await contract.CreateVestingPlan(
                organizationTokenAddress, stakeholderAddress, stakeholderType, 
                totalSupply, startTime, releaseTime, vestingPeriod, releasedTokens
              );
              registerOrganization.wait();
              setVestingLoading(false)
              
            } catch (error) {

              console.log('create vesting error => ', error.message);
              setVestingLoading(false)
            } 

          }else {
            alert("Organization not registered")
            setVestingLoading(false)
          }
      } catch (error) {
        console.log("organization_details => ", error)
        setVestingLoading(false)
      }
      
    }

  }
 
  const ClaimToken = async () => {
    if (!walletAddress) {
      alert("connect wallet to continue")
    }
    else if (!orgTokenAddress) {
      alert("Input token address")
    }
    else {
      setClaimLoading(true)
      try {
        const claimtoken = await contract.claimTokens(orgTokenAddress);
        claimtoken.wait();
        setClaimLoading(false)
      } catch (error) {
        alert(error.reason)
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
             connectionLoading ? "Loading..." : walletAddress ? `${walletAddress.slice(0,5)}...${walletAddress.slice(walletAddress.length-5, walletAddress.length)}`
              : "Connect Wallet"
            }
          </button>
        </div>
        
        {/* add organization */}
        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>
          <h1>Add Organization Token Details</h1>
          <input type="text" 
              placeholder='Enter token address' 
              onChange={(adr) => setTokenAddress(adr.target.value.trim())}
              className=' outline-none p-2 mt-3'
          />
          <input type="text" 
            placeholder='Enter token name' 
            onChange={(nme) => setTokenName(nme.target.value.trim())}
            className=' outline-none p-2 mt-3'
          />
          <input type="text" 
            placeholder='Enter token symbol' 
            onChange={(sym) => setTokenSymbol(sym.target.value.trim())}
            className=' outline-none p-2 mt-3'
          />
          <button 
            onClick={RegisterOrganization} 
            className=' bg-purple-800 text-white mt-4 p-2 rounded-md'>
             {registrationLoading ? "Loading..." : "Register"}
          </button>
        </div>  
        {/* ends register organization */}

        {/* Vesting Plan */}
        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>
          <h1>Vesting Schedule</h1>
          <input type="text" 
              placeholder='Enter Organization token address' 
              onChange={(ota) => setOrganizationTokenAddress(ota.target.value.trim())}
              className=' outline-none p-2 mt-3'
          />
          <input type="text" 
            placeholder='Enter stakeholder address' 
            onChange={(stk) => setStakeholderAddress(stk.target.value.trim())}
            className=' outline-none p-2 mt-3'
          />
          <input type="text" 
            placeholder='Enter stakeholder type' 
            onChange={(typ) => setStakeholderType(typ.target.value.trim())}
            className=' outline-none p-2 mt-3'
          />
          <input type="number" 
            placeholder='Token total supply' 
            onChange={(tot) => setTotalSupply(parseInt(tot.target.value.trim()))}
            className=' outline-none p-2 mt-3'
          />
          <label className='mt-4' htmlFor="start_time">Start time</label>
          <input type="number" id='start_time'
            placeholder='Vesting start time in seconds' 
            onChange={(st) => setStartTime(parseInt(st.target.value))}
            className=' outline-none p-2 mt-3'
          />
            <input type="number" 
            placeholder='Vesting period' 
            onChange={(vpd) => setVestingPeriod(parseInt(vpd.target.value))}
            className=' outline-none p-2 mt-3'
          />
          <label className='mt-4' htmlFor="release_time">Release time</label>
          <input type="number"  id='release_time'
            placeholder='Release time in seconds' 
            onChange={(rst) => setReleaseTime(parseInt(rst.target.value))}
            className=' outline-none p-2 mt-3'
          />
           <input type="number" 
            placeholder='Released tokens' 
            onChange={(rt) => setReleasedTokens(parseInt(rt.target.value))}
            className=' outline-none p-2 mt-3'
          />
          <button 
            className=' bg-purple-800 text-white mt-4 p-2 rounded-md'
            onClick={VestingSchedule}
            >
            {vestingLoading ? "Loading..." : "Schedule Vesting"}
          </button>
        </div>
        {/* ends vesting Schedule */}

        {/* claim token */}
        <div className='mt-8 w-[90%] mx-auto bg-gray-100 rounded-md flex flex-col p-4'>
          <h1>Claim Token</h1>
          <input type="text" 
              placeholder='Enter Organization token address' 
              onChange={(oga) => setOrgTokenAddress(oga.target.value.trim())}
              className=' outline-none p-2 mt-3'
          />

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