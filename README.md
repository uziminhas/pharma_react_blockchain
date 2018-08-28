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

(5) Wait 15-30 seconds for transaction to be confirmed

(6) Open/inspect the browser's console window

(7) Click "Query latest prescription" button after transaction has been mined/confirmed. You will see the recently submitted prescription data in the browser's console, reflecting the state change of the smart contract.

## Checking test cases
```
$ truffle compile
$ truffle migrate
$ truffle test
```

