import React from 'react';
import TransactionRow from "./TransactionRow";
import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import PropTypes from "prop-types";

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);
        this.unsorted = true;
        this.ascSorted = true;
        this.selectedMonth = 0;
        this.selectedYear = 0;
    }

    render() {
        return (
            <div>
                <MDBTable md-10 id={"transaction-table"}>
                    <MDBTableHead color="default-color" id={"header"} textWhite>
                        <tr className={"z-depth-1"} id={"header-row"}>
                            <th className="border z-depth-1" id={"date"}>Date
                                {this.props.allTransactions &&
                                <i className="fas fa-filter" data-toggle="modal" data-target="#date-filter"> </i>
                                }
                            </th>
                            <th className="border z-depth-1" id={"type"}>Type
                                {this.props.allTransactions &&
                                <i className="fas fa-filter" data-toggle="modal" data-target="#type-filter"> </i>
                                }
                            </th>
                            <th className="border z-depth-1" id={"amount"}>({'\u20B9'}) Amount
                                {this.props.allTransactions && this.unsorted &&
                                <i className="fas fa-arrows-alt-v"> </i>
                                }
                                {this.props.allTransactions && !this.unsorted && this.ascSorted &&
                                <i className="fas fa-arrows-alt-v"> </i>
                                }
                                {this.props.allTransactions && !this.unsorted && !this.ascSorted &&
                                <i className="fas fa-arrows-alt-v"> </i>
                                }
                            </th>
                            <th className="border z-depth-1" id={"remarks"}>Remarks
                                {this.props.allTransactions &&
                                <i className="fas fa-filter"> </i>
                                }
                            </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody id={"transaction-data"}>
                        {this.props.transactions.length > 0 &&
                        this.props.transactions.map(transaction => (
                            <TransactionRow key={transaction.id} transaction={transaction}/>
                        ))
                        }
                    </MDBTableBody>
                </MDBTable>
                <div id={"no-transaction-data"}>
                    {this.props.loading &&
                    <p> Loading...</p>
                    }
                </div>
                <div id={"no-transaction-data"}>
                    {!this.props.loading && this.props.transactions.length === 0 &&
                    <p>No Records found <i className="fas fa-ban">
                    </i></p>
                    }
                </div>
            </div>
        );
    }
}


TransactionTable.propTypes = {
    transactions: PropTypes.array,
    allTransactions: PropTypes.bool,
    loading: PropTypes.bool
};

export default TransactionTable;