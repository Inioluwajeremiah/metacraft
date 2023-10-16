Problem Statement:
Using Solidity - create an insurance provider protocol. The insurance mechanism is simple. Users of an insurance platform provide liquidity to cover damage in the case of an insured event, and they themselves receive interest for providing liquidity. You can refer to Etherisc for some inspiration

You will have to build 2 main components of the insurance:

Crypto wallet insurance: You will have to build an insurance protocol that helps owners of smart contract wallets stay protected from hackers. The owners will be paying an insurance amount per month, set by the protocol. You can choose to invest the insurance amount in other DeFi schemes.
Collateral protection for crypto backed loans: Based on the insurance policy the user has chosen, you can decide to give back the entire loan or % of the loan when the collateral value drops.
In order to pass the assessment, complete the following steps:

Create separate Solidity contracts for both insurance types.
Have clearly defined policies (a minimum of two different types) for each insurance type.
Follow the factory contract model where for each user, a separate insurance contract is deployed.
Users should be able to pay the premium and claim the insurance with the required checks.
You are recommended to use Testnet for testing purposes.