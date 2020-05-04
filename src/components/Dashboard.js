import React, {Component} from 'react';
import Wallet from "./Wallet";
import TransactionModel from "../models/TransactionModel";
import TransactionTable from "./TransactionTable";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import NavigationBar from "./NavigationBar";
import WalletModel from "../models/WalletModel";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: new TransactionModel([]),
            showTransactions: true,
            amount: 50,
            remarks: "",
            depositMoney: false,
            wallet: new WalletModel({balance: 0}),
            depositSuccess: false,
            depositFailure: false,
            loading:true
        };
    }

    componentDidMount() {
        this.loadRecentTransactions();
        WalletModel.fetch(1).then((wallet) => {
            this.setState({
                wallet: wallet,
                loading: false
            });
        });
    }

    loadRecentTransactions = () => {
        let noOfTransactions = 5;
        if (window.innerWidth <= 400) {
            noOfTransactions = 3;
        }
        TransactionModel.fetchRecentTransactions(1, noOfTransactions)
            .then((transactions) => {
                this.setState({
                    transactions: transactions
                });
            });
    };

    showDepositForm = () => {
        this.setState({
            showTransactions: false
        })
    };

    showTransactions = () => {
        this.setState({
            showTransactions: true
        })
    };

    depositMoney = () => {
        let transaction = {};
        transaction['amount'] = this.state.amount;
        transaction['remarks'] = this.state.remarks;
        transaction['type'] = 'CREDIT';
        this.setState({
           depositMoney: true
        });
        TransactionModel.createTransaction(1, transaction).then((wallet) => {
            if(wallet.success()){
                this.setState({
                    showTransactions: true,
                    depositMoney: false,
                    depositFailure: false,
                    wallet: wallet,
                    depositSuccess: true
                });
                this.loadRecentTransactions();
            }
            else{
                this.setState({
                    showTransactions: true,
                    depositMoney: false,
                    depositFailure: true,
                    depositSuccess: false,
                    errorMessage: wallet.message()
                })
            }
        });
    };

    render() {
        return (
            <div>
                <NavigationBar/>
                <Wallet loading={this.state.loading} wallet={this.state.wallet} showDepositForm={this.showDepositForm}/>
                { this.state.showTransactions ?
                    <div>
                        <MDBContainer>
                            <span>
                                <span style={{float: 'left'}}><h1 id={"table-heading"}>Recent Transactions</h1></span>
                                <span style={{float: 'right'}} id="deposit-success"><h1 style={{color: 'green'}}>{this.state.depositSuccess ? "Transaction is successful": ""}</h1></span>
                                <span style={{float: 'right'}} id="deposit-failure"><h1 style={{color: 'red'}}>{this.state.depositFailure ? this.state.errorMessage: ""}</h1></span>
                            </span>
                            <TransactionTable transactions={this.state.transactions
                                .transactions()}/>
                            <div id={"transactions-navigator"}>
                                <Link to="/transactions/">
                                    <MDBBtn rounded outline>View all</MDBBtn>
                                </Link>
                            </div>
                        </MDBContainer>
                    </div> :
                    this.state.depositMoney ? <h1>Loading...</h1> :
                    <MDBContainer id="deposit-form">
                        <MDBContainer id="mdb-container" fluid className="p-lg-5">
                            <MDBRow style={{paddingRight: "3%", paddingLeft: "3%", paddingBottom: "3%"}}>
                                <MDBCol>
                                    <MDBCard>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBCardTitle style={{backgroundColor: '#2bbbad'}} className="p-3">
                                                    <span>Deposit Money</span>
                                                    <button type="button"
                                                            className="close"
                                                            aria-label="Close"
                                                            id="close-deposit-form"
                                                            onClick={this.showTransactions}
                                                    >
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </MDBCardTitle>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBCardBody>
                                            <MDBRow className="p-lg-3" id="deposit-amount">
                                                    <label> Amount: &nbsp;
                                                        <input type="number"
                                                               min="50"
                                                               max="50000"
                                                               id="amount"
                                                               value={this.state.amount}
                                                               name="amount"
                                                               onChange={this.handleAmountChange}
                                                        />
                                                    </label>
                                            </MDBRow>
                                            <MDBRow className="p-lg-3">
                                                    <label> Remarks: &nbsp;
                                                        <input type="text"
                                                               name="remarks"
                                                               id="deposit-remarks"
                                                               value={this.state.remarks}
                                                               onChange={this.handleRemarksChange}
                                                        />
                                                    </label>
                                                <MDBCol className="float-right">
                                                    {(this.state.amount < 50 || this.state.amount > 50000) ? <h4 style={{color: 'red'}}>Entered amount is outside the allowed range</h4> :
                                                        <MDBBtn rounded outline onClick={this.depositMoney}>Deposit</MDBBtn>
                                                    }
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBContainer>
                }

            </div>
        );
    }

    handleAmountChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    };

    handleRemarksChange = (event) => {
        this.setState({
            remarks: event.target.value
        })
    }
}

export default Dashboard;
