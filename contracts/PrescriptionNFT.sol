pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;
import "./SafeMath.sol";

/**
 * Notes: 
 * @title PrescriptionNFT
 * Non-Fungible Token implementation of pharmaceutical prescriptions
 *
 */
contract PrescriptionNFT {
  //using SafeMath for uint256

  struct Prescription {

    // Unique Id of the prescription
    uint256 prescriptionId;

    // Wallet address of the patient
    address patientAddress;

    // Scientific name of the medicine
    string medicationName;

    // Brand name of the medicine
    string brandName;

    // Quantity of dosage
    uint256 dosageQuantity;

    // Unit for the dosage (mg, `ml, etc)
    string dosageUnit;

    // Epoch time when the preciption was given (mint time)
    uint256 dateFilled;

    //Epoch expiration date (When is this prescription no longer valid)
    uint256 expirationTime;

    // Wallet address of the owner
    address owner;
  }

  // Store Prescription count to be used as Id for mapping
  uint256 public prescriptionCount;

  // Total number of token that have been minted
  uint256 private totalTokens;  

  /*
   *  Mappings 
   */

  // Map of the prescriptions created Map<tokenId, Prescription>  
  mapping (uint256 => Prescription) public prescriptions;

  // Store Doctor accounts that have prescribed
  mapping(address => bool) public doctors;
 
  /**
   * @dev NFT Constructor
   * Create a new PrescriptionNFT 
   */

  function PrescriptionNFT() public {
  }

 /*
 * Doctor methods
 */

  // Prescribed event call
  event prescribedEvent (
    address indexed _patientAddress
  );

  function getPrescription() public view returns (Prescription) {
    return prescriptions[prescriptionCount];
  }

  function getPrescriptionData() public view returns (uint256, address, string, string, uint256, string, uint256, uint256, address) {
    return (
      prescriptions[prescriptionCount].prescriptionId, 
      prescriptions[prescriptionCount].patientAddress, 
      prescriptions[prescriptionCount].medicationName, 
      prescriptions[prescriptionCount].brandName,
      prescriptions[prescriptionCount].dosageQuantity,
      prescriptions[prescriptionCount].dosageUnit,
      prescriptions[prescriptionCount].dateFilled,
      prescriptions[prescriptionCount].expirationTime,
      prescriptions[prescriptionCount].owner
    );
  }

  /**
  * @dev Fill the Prescription with the given tokenId. This means that the user will 
  *   transfer their Prescription tokens to the pharmacy address
  * @param _patientAddress wallet address of the patient to recieve the prescription tokens
  * @param _medicationName medication name
  * @param _brandName medication brand
  * @param _dosageQuantity payload per pill
  * @param _dosageUnit unit for payload per pill (mg, ml, etc)
  * @param _dateFilled epoch date when the token was minted
  * @param _expirationTime epoch date when the token expires
  * @param _owner msg.sender of the contract
  */

  function prescribe(
    address _patientAddress, 
    string _medicationName,
    string _brandName,
    uint256 _dosageQuantity,
    string _dosageUnit,
    uint256 _dateFilled,
    uint256 _expirationTime,
    address _owner) public payable {
      
      // We will start the first tokenId at 0 and essentially treat it as an index
      // The next token id will just be = to the # of tokens 
      //uint256 newTokenId = totalTokens;

      // Increment count of prescriptions, will be used as unique identifier
      prescriptionCount++;

      // Require non-negative dosage quantity
      require(_dosageQuantity >= 0);

      // Create a new Prescription and add to mapping
      prescriptions[prescriptionCount] = Prescription(
        prescriptionCount,
        _patientAddress,
        _medicationName,
        _brandName,
        _dosageQuantity,
        _dosageUnit,
        _dateFilled,
        _expirationTime,
        msg.sender
      );

      // Trigger prescribed event
      prescribedEvent(_patientAddress);

  }

}
