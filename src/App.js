/**
 * web3Context = {
 *   accounts: {Array<string>} - All accounts
 *   selectedAccount: {string} - Default ETH account address (coinbase)
 *   network: {string} - One of 'MAINNET', 'ROPSTEN', or 'UNKNOWN'
 *   networkId: {string} - The network ID (e.g. '1' for main net)
 }
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
//import PrescriptionNFT from '../build/contracts/PrescriptionNFT.json'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Media, Table, Button,
  Modal, ModalHeader,
  ModalBody, ModalFooter, Form, FormGroup,
  Label, Input
} from 'reactstrap';

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: { "dosage-unit": "ml" },
    };
    //this.web3Context = this.context.web3;


    // if (typeof web3 != 'undefined') {
    //   this.web3Provider = Web3.currentProvider
    // } else {
    //   this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    // }

    // this.web3 = new Web3(this.web3Provider)

    // this.prescription = TruffleContract(PrescriptionNFT)
    // this.prescription.setProvider(this.web3Provider)

    //this.castVote = this.castVote.bind(this)
    //this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    
    const MyContract = window.web3.eth.contract([{"constant":false,"inputs":[{"name":"_patientAddress","type":"address"},{"name":"_medicationName","type":"string"},{"name":"_brandName","type":"string"},{"name":"_dosageQuantity","type":"uint256"},{"name":"_dosageUnit","type":"string"},{"name":"_dateFilled","type":"uint256"},{"name":"_expirationTime","type":"uint256"},{"name":"_owner","type":"address"}],"name":"prescribe","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_patientAddress","type":"address"}],"name":"prescribedEvent","type":"event"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"doctors","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPrescription","outputs":[{"components":[{"name":"prescriptionId","type":"uint256"},{"name":"patientAddress","type":"address"},{"name":"medicationName","type":"string"},{"name":"brandName","type":"string"},{"name":"dosageQuantity","type":"uint256"},{"name":"dosageUnit","type":"string"},{"name":"dateFilled","type":"uint256"},{"name":"expirationTime","type":"uint256"},{"name":"owner","type":"address"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPrescriptionData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"prescriptionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"prescriptions","outputs":[{"name":"prescriptionId","type":"uint256"},{"name":"patientAddress","type":"address"},{"name":"medicationName","type":"string"},{"name":"brandName","type":"string"},{"name":"dosageQuantity","type":"uint256"},{"name":"dosageUnit","type":"string"},{"name":"dateFilled","type":"uint256"},{"name":"expirationTime","type":"uint256"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}])
    this.web3Context = this.context.web3;

    this.state.ContractInstance = MyContract.at("0x80a02c6bf5575f22b24b8b4506f96be9e6cc3a69")
    
    /*
    this.state.ContractInstance.prescriptionCount().then((prescriptionCount) => {
      for(var i = 0; i < prescriptionCount; i++) {
        this.state.ContractInstance.prescriptions(i).then((prescription) => {
          const prescriptions = [...this.state.prescriptions]
          prescriptions.push({
            prescriptionId: prescription[0],
            patientAddress: prescription[1],
            medicationName: prescription[2],
            brandName: prescription[3],
            dosageQuantity: prescription[4],
            dosageUnit: prescription[5],
            dateFilled: prescription[6],
            expirationTime: prescription[7],
            owner: prescription[8]
          });
          this.setState({ prescriptions: prescriptions })
        });
      }
    })
    */

    // this.web3.eth.getCoinbase((err, account) => {
    //   this.setState({ account })
    //   this.prescription.deployed().then((prescriptionInstance) => {
    //     this.state.ContractInstance = prescriptionInstance
    //   })
    // })
  }

  sendPrescription() {
    this.state.ContractInstance.prescribe(
      this.state.formState["patient-address"],
      this.state.formState["medication-name"],
      this.state.formState["brand-name"],
      this.state.formState["dosage-quantity"],
      this.state.formState["dosage-unit"],
      Date.now(),
      Date.now(this.state.formState["expiration-date"]),
      this.web3Context.selectedAccount,
      // {
      //   gas: 300000,
      //   gasPrice: 400000000000,
      //   from: this.context.web3.selectedAccount,
      //   value: 0
      // },
      (err, result) => {
        console.log("Err", err);
        console.log("Res", result);
        if (result) {
          this.setState({ transactionId: result });
        }
        // if (result) { this.props.toggle(); }
      }
    )
    return false;
  }

  inputUpdate(event) {
    this.setState({ formState: { ...this.state.formState, [event.target.name]: event.target.value }})
    return false;
  }

  render () {
    if (this.state.transactionId) {
    return (
      <Modal isOpen={this.props.visibility} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}><img src="https://cdn1.iconfinder.com/data/icons/interface-elements/32/accept-circle-512.png" width="30" height="30"/> Your prescription has been sent!</ModalHeader>
        <ModalBody>
          <p>Your prescription has successfully been sent to the patient and is avaliable at the following transaction address (TxHash): <code>{this.state.transactionId}</code></p>
        </ModalBody>
      </Modal>);
    } else {
    return (
      <Modal isOpen={this.props.visibility} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Create a prescription</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Patient wallet address (must be valid "0x" address):</Label>
              <Input type="text" name="patient-address" onChange={this.inputUpdate.bind(this)} value={this.state.formState["patient-address"] || ""} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Medication Name (string)</Label>
              <Input type="text" name="medication-name" onChange={this.inputUpdate.bind(this)} value={this.state.formState["medication-name"] || ""} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Brand Name (string)</Label>
              <Input type="text" name="brand-name" onChange={this.inputUpdate.bind(this)} value={this.state.formState["brand-name"] || ""} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Dosage Quantity (integer)</Label>
              <Input type="number" name="dosage-quantity" onChange={this.inputUpdate.bind(this)} value={this.state.formState["dosage-quantity"] || ""} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Dosage Unit</Label>
              <Input type="select" name="dosage-unit" onChange={this.inputUpdate.bind(this)} value={this.state.formState["dosage-unit"] || ""} >
                <option value="ml">ml</option>
                <option value="mg">mg</option>
                <option value="tablets">tablets</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Expiration Date</Label>
              <Input type="date" name="expiration-date" placeholder="" onChange={this.inputUpdate.bind(this)} value={this.state.formState["expiration-date"] || ""} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.sendPrescription.bind(this)}>Send Prescription</Button>
        </ModalFooter>
      </Modal>
    );
    }
  }
}

ModalForm.contextTypes = {
  web3: PropTypes.object
};

class App extends Component {
  constructor(props) {
    super(props);

    const MyContract = window.web3.eth.contract([{"constant":false,"inputs":[{"name":"_patientAddress","type":"address"},{"name":"_medicationName","type":"string"},{"name":"_brandName","type":"string"},{"name":"_dosageQuantity","type":"uint256"},{"name":"_dosageUnit","type":"string"},{"name":"_dateFilled","type":"uint256"},{"name":"_expirationTime","type":"uint256"},{"name":"_owner","type":"address"}],"name":"prescribe","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_patientAddress","type":"address"}],"name":"prescribedEvent","type":"event"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"doctors","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPrescription","outputs":[{"components":[{"name":"prescriptionId","type":"uint256"},{"name":"patientAddress","type":"address"},{"name":"medicationName","type":"string"},{"name":"brandName","type":"string"},{"name":"dosageQuantity","type":"uint256"},{"name":"dosageUnit","type":"string"},{"name":"dateFilled","type":"uint256"},{"name":"expirationTime","type":"uint256"},{"name":"owner","type":"address"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPrescriptionData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"prescriptionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"prescriptions","outputs":[{"name":"prescriptionId","type":"uint256"},{"name":"patientAddress","type":"address"},{"name":"medicationName","type":"string"},{"name":"brandName","type":"string"},{"name":"dosageQuantity","type":"uint256"},{"name":"dosageUnit","type":"string"},{"name":"dateFilled","type":"uint256"},{"name":"expirationTime","type":"uint256"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}])

    this.state = {
      ContractInstance: MyContract.at("0x80a02c6bf5575f22b24b8b4506f96be9e6cc3a69"),
      modal: false,
      prescriptions: [],
      transactionLogs: [
        // some sample transaction logs to populate the demo
        {
          expiryTime: new Date("3/31/18"),
          prescribedAt: new Date("3/7/18"),
          patientWalletAddress: "0x1a0e14c6c2d16dd42b00b4152645a8b51f2698d6",
          medicationName: "Atorvastatin Calcium",
          brandName: "Lipitor",
          dosage: "120",
          dosageUnit: "mg",
        },
        {
          expiryTime: new Date("3/17/18"),
          prescribedAt: new Date("3/2/18"),
          patientWalletAddress: "0x1a0e14c6c2d16dd42b00b4152645a8b51f2698d6",
          medicationName: "Omeprazole",
          brandName: "Prilosec",
          dosage: "20",
          dosageUnit: "tablets",
        },
        {
          expiryTime: new Date("3/31/18"),
          prescribedAt: new Date("3/1/18"),
          patientWalletAddress: "0x4b5d44c6c2d16cc42b00b4152645a8b51f2698d6",
          medicationName: "Amlodipine",
          brandName: "Norvasc",
          dosage: "20",
          dosageUnit: "mg",
        },
        {
          expiryTime: new Date("3/15/18"),
          prescribedAt: new Date("3/3/18"),
          patientWalletAddress: "0x7b5d44c6c2d16dd42b00b4152645a8b51f2698d6",
          medicationName: "Amlodipine",
          brandName: "Norvasc",
          dosage: "50",
          dosageUnit: "mg",
        },
        {
          expiryTime: new Date("3/12/18"),
          prescribedAt: new Date("3/4/18"),
          patientWalletAddress: "0x1a0e14c6c2d16dd42b00b4152645a8b51f2698d6",
          medicationName: "Simvastatin",
          brandName: "Zocor",
          dosage: "400",
          dosageUnit: "mg",
        },
        {
          expiryTime: new Date("3/12/18"),
          prescribedAt: new Date("3/6/18"),
          patientWalletAddress: "0x1a0e14c6c2d16dd42b00b4152645a8b51f2698d6",
          medicationName: "Acetaminophen",
          brandName: "Lortab",
          dosage: "150",
          dosageUnit: "mg",
        },
      ]
    }
    this.queryPrescription = this.queryPrescription.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  queryPrescription() {
    
    const { getPrescriptionData } = this.state.ContractInstance;
    
    getPrescriptionData ((err, prescriptionData) => {
      if (err) console.error('An error occurred', err);
      console.log('This is the latest prescription that has been submitted', prescriptionData);
    })
 
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  renderTableRow(tx) {
    
    return (
      <tr>
        <th>
          <small>
            {tx.patientWalletAddress}
          </small>
        </th>
        <td>{new Date(tx.expiryTime).toLocaleDateString("en-US")}</td>
        <td>{new Date(tx.prescribedAt).toLocaleDateString("en-US")}</td>
        <td>{tx.dosage}{tx.dosageUnit} of {tx.brandName} ({tx.medicationName})</td>
        <td>
          <Button color="primary" size="sm">Renew</Button>{' '}
          <Button color="secondary" size="sm">Cancel</Button>
        </td>
      </tr>
    )
  
  }

  renderPatientDashboard() {

  }

  render() {
    const web3Context = this.context.web3;

    return (
      <div className="App container">
        <strong>Decentralized Hospital Network</strong>
        <hr />
        <div className="row">
          <div className="col-md-7">
            <Media>
              <Media className="rounded-circle" object src="https://cdn.ratemds.com/media/doctors/doctor/image/doctor-armin-tehrany-orthopedics-sports_RD4hDWC.jpg_thumbs/v1_at_100x100.jpg" alt="Generic placeholder image" style={{ marginRight: 15 }} width="100" height="100" />
              <Media body>
                <h1>Hello, Doctor!</h1>
                <h4>Your current medical account / wallet:</h4>
                <code>{web3Context.selectedAccount}</code>
              </Media>
            </Media>
          </div>
          <div className="col-md-2">
            <br />
            <Button color="success" onClick={this.toggle}>Create a prescription</Button>
            <br />
            <br />
            <Button color="success" onClick={ this.queryPrescription }> Query latest prescription (inspect/view in console)</Button>
            <br />
            <br />
          </div>
        </div>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Patient address</th>
              <th>Expires at</th>
              <th>Prescribed at</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactionLogs.map(this.renderTableRow.bind(this))}
          </tbody>
        </Table>

        <ModalForm visibility={this.state.modal} toggle={this.toggle} />
      </div>
    );
  }
}

App.contextTypes = {
  web3: PropTypes.object
};
export default App;
