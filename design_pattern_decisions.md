## Built with the following design patterns

ReactJS - Front-end web framework, used for its component-based structure and fast re-rendering capabilities.

Bootstrap - CSS framework, used for its modern and customizable styling tools

Node - Back-end to handle dependencies and module imports

Truffle suite - Used to interact with smart contracts via web3 in client-side JavaScript

## Smart contract design theory - PrescriptionNFT.sol

The PrescriptionNFT.sol file is a solidity smart-contract which formalizes the tokenization of the pharmaceutical script. The token takes an input from a doctor, which gets formalized as data within a stryct. These inputs are:

Prescription ID - unique identifier based on total prescription count.
Patient Address - wallet address of the Patient which acts as a verifying mechanism for the pharmacist to prevent dishonest transfer
Medication Name - the name of the pharmaceutical
Brand Name - the specific brand of the pharmaceutical
Dosage Quantity - a number representing the payload to be dispensed by the pharmacist
Dosage Unit - this will be the formalized measurement unit (i.e mililiters, miligrams)
Date Filled - the date in which the order was filled by the pharmacist
Expiration Date - the date in which the prescription expires. We check against the expiration date when the patient tries to fill the prescription
Owner - msg.sender or the account of the doctor who submits the prescription





