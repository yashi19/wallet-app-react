import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import '../styles/Wallet.css';

// or less ideally

class Wallet extends Component {
    getUsername() {
        return "Riju";
    }

    render() {
        return (
            <MDBContainer id="mdb-container" fluid className="p-lg-5">
                <MDBRow style={{paddingRight: "3%", paddingLeft: "3%", paddingBottom: "3%"}}>
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol id="user-greeting">
                                        <MDBRow>
                                            <MDBCardText style={{paddingTop: "5%", paddingLeft: "5%"}}>
                                                    <h1 className="align-middle"
                                                    id="userGreeting" style={{width: "max-content"}}>Hi {this.getUsername()}</h1>
                                            </MDBCardText>
                                        </MDBRow>
                                    </MDBCol>
                                    <MDBCol id="wallet-balance">
                                        <MDBCard style={{width: "80%", float: "right"}}>
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBIcon id="mdb-icon" icon="wallet" size="5x" className="p-lg-5"/>
                                                    <MDBCardText className="p-lg-5">
                                                        <br/>
                                                        <span id="balance">
                                                                <h1>{this.props.loading ? "Loading...." : '\u20B9' + this.props.wallet.balance()}</h1>
                                                            </span>
                                                    </MDBCardText>
                                                    <MDBCol>
                                                        <MDBRow className="p-lg-3">
                                                            <MDBBtn rounded outline onClick={this.props.showDepositForm}>Deposit</MDBBtn>
                                                        </MDBRow>
                                                        <MDBRow className="p-lg-2">
                                                            <MDBBtn rounded outline>Withdraw</MDBBtn>
                                                        </MDBRow>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Wallet;
