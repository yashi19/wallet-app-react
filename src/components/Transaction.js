import React, {Component, Fragment} from "react";
import TransactionModel from "../models/TransactionModel";
import {
    MDBCol,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBInput,
    MDBRow
} from "mdbreact";
import TransactionTable from "./TransactionTable";
import NavigationBar from "./NavigationBar";

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: new TransactionModel([]),
            loading: true,
            selectedMonth: "Month",
            selectedYear: 2019,
            selectedType: []

        };
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.years = [2019];
        this.transactions = [];
        this.type = [];
    }

    componentDidMount() {
        TransactionModel.fetch(1).then((transactions) => {
            // const allTransactions = transactions.transactions();
            const modifiedState = {...this.state, transactions: transactions};
            this.setState(modifiedState);
            this.transactions = transactions;
        });
    }

    filterTransactionsByMonth = (event) => {
        const monthIndex = Number(event.target.value) + 1;
        const month = this.months[monthIndex - 1];
        TransactionModel.fetchTransactionsByMonthAndYear(1, monthIndex, 2019)
            .then((transactions) => {
                const modifiedState = {
                    ...this.state,
                    transactions: transactions,
                    selectedMonth: month
                };
                this.setState(modifiedState);
            });
    };

    filterTransactionsByYear = (event) => {
        const year = event.target.value;
        const month = this.months.indexOf(this.state.selectedMonth) + 1;
        TransactionModel.fetchTransactionsByMonthAndYear(1, month, year)
            .then((transactions) => {
                const modifiedState = {
                    ...this.state,
                    transactions: transactions,
                    selectedYear: year
                };
                this.setState(modifiedState);
            });
    };

    setFilterTypes = (event) => {
        const type = event.target.value;
        if (event.target.checked) {
            this.type.push(type);
            this.setState({
               selectedType: this.type
            });
        }
        else{
            const typeIndex = this.type.indexOf(type);
            this.type.splice(typeIndex);
            this.setState({
                selectedType: this.type
            });
        }
        this.filterTransactionsByType(this.type[0]);
        console.log(this.type);
    };

    filterTransactionsByType(type) {
        if (this.type.length === 1) {
            TransactionModel.fetchTransactionsByType(1, type)
                .then((transactions) => {
                    const modifiedState = {
                        ...this.state,
                        transactions: transactions,
                    };
                    this.setState(modifiedState);
                });
        }
        else {
            const modifiedState = {
                ...this.state,
                transactions: this.transactions,
            };
            this.setState(modifiedState);
        }

    };


    filteredTransactions = () => {
        return this.state.transactions.transactions();
    };

    render() {
        return (
            <div>
                <NavigationBar/>
                <MDBRow id={"filter"}>
                    <Fragment>
                        <MDBDropdown>
                            <MDBDropdownToggle caret color="default">
                                {this.state.selectedMonth}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu color="default" basic>
                                {
                                    this.months.map((month, index) =>
                                        <MDBDropdownItem id={"month-" + index} value={index} key={month}
                                                         onClick={this.filterTransactionsByMonth}> {month} </MDBDropdownItem>
                                    )
                                }
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </Fragment>

                    <Fragment>
                        <MDBDropdown>
                            <MDBDropdownToggle caret color="default">
                                {this.state.selectedYear}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu color="default" basic>
                                {
                                    this.years.map(year =>
                                        <MDBDropdownItem id="year-filter" value={year} key={year}
                                                         onClick={this.filterTransactionsByYear}> {year} </MDBDropdownItem>
                                    )
                                }
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </Fragment>
                </MDBRow>
                <label>
                    <MDBInput label="Credit" filled type="checkbox" id="" value="CREDIT"
                              onClick={this.setFilterTypes}/>
                </label>
                <label>

                    <MDBInput label="Debit" filled type="checkbox" id="" value="DEBIT"
                              onClick={this.setFilterTypes}/>
                </label>


                <MDBContainer>
                    <h1 id="transactions-head">Transactions</h1>
                    <MDBRow>
                        <MDBCol>
                            <TransactionTable transactions={this.filteredTransactions()} allTransactions={true}
                                              Loading={this.state.loading}/>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Transaction;