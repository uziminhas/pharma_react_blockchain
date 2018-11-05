<h1 align="center"> ConsenSys Developer Academy 2018: Final Project </h1>

![logo](http://g.recordit.co/rqhzjb7tSI.gif)

## Introduction

A project which tokenizes pharmaceutical prescriptions into an ERC-721 solidity contract standard. This non-fungible token carries metadata describing the doctor ID, the patient's public key, the drug RX Id, and the unit quantity to be dispensed.

By creating a decentralized smart-contract standard that defines the method for ownership and transferability of a pharmaceutical script, the following goals can be achieved:

1. Remove the possibility of counterfeit/forged prescriptions
2. Enable regulatory insight into the quantity, concentration, movement, etc. of drugs
3. Create an immutable record of the movement, quantity, and RX type of pharmacy scripts


## Getting started / running the application
```
$ npm install
$ npm start
```
## Using the Ropsten test network

After the application loads, before creating / signing a prescription, you must be connected to the Ropsten network via MetaMask to interact with the deployed smart contract.

For testing purporses, you can request fake Ether at the following Ropsten faucet. 

(1) Go to: https://faucet.ropsten.be/

(2) Enter your account address

(3) Click "Send me test Ether"

(4) Wait 15 seconds for fake Ropsten Ether to be added to your account

## Creating / signing a prescription

After the application loads, follow the steps below to create / sign a prescription.

(1) Click "Create a prescription" button

(2) Input data in the fields according to indicated data types

(3) Click "Send prescription" button

(4) MetaMask pop-up will open; pay appropriate gas using Ether from Ropsten account; click "Submit" to send the transaction

(5) A pop-up will appear indicating the prescription has been sent to the patient's address. Wait 15-30 seconds for transaction to be confirmed. You can copy the TxHash and view the pending transaction on the Ropsten etherscan (i.e. https://ropsten.etherscan.io/tx/{yourTxHashhere}

(6) Open/inspect the browser's console window

(7) Click "Query latest prescription" button after transaction has been mined/confirmed. You will see the recently submitted prescription data in the browser's console, reflecting the state change of the smart contract.

(8) Refresh the page to send/sign another prescription.

## Checking test cases

Open up Ganache on port 8545 and run the following commands from inside the project directory.
```
$ truffle compile
$ truffle migrate
$ truffle test
```


