import {mount, shallow} from "enzyme";
import React from "react";
import TransactionTable from "../components/TransactionTable";
import TransactionRow from "../components/TransactionRow";

function getSingleTransactionArray() {
  return ([
    {id: 1, amount: 100, type: 'Credit', remarks: 'Add 100'},
  ]);
}

function getTransactions() {
  return ([
    {id: 2, amount: 30, type: 'CREDIT', remarks: 'Add'},
    {id: 1, amount: 20, type: 'DEBIT', remarks: 'Withdraw'},
  ]);
}

describe('Transactions', () => {
  it('should render without crashing', () => {
    const transactions = getSingleTransactionArray();

    shallow(<TransactionTable transactions={transactions}/>);
  });

  it('should render amount, type and remarks in header', () => {
    const transactions = getSingleTransactionArray();
    const transactionWrapper = shallow(<TransactionTable transactions={transactions}/>);


    const amountHeader = transactionWrapper.find('#amount').text();
    const typeHeader = transactionWrapper.find('#type').text();
    const remarksHeader = transactionWrapper.find('#remarks').text();

    expect(amountHeader).toEqual('(' + '\u20B9' + ') Amount');
    expect(typeHeader).toEqual('Type');
    expect(remarksHeader).toEqual('Remarks');
  });

  it.skip('should be able to render single transaction', () => {
    const transactions = getSingleTransactionArray();
    const transactionWrapper = mount(<TransactionTable transactions={transactions}/>);

    const transactionTable = transactionWrapper.find(TransactionRow).childAt(0);

    expect(transactionTable.find('#amount').text()).toEqual('100');
    expect(transactionTable.find('#type').text()).toEqual('Credit');
    expect(transactionTable.find('#remarks').text()).toEqual('Add 100');
  });

  it.skip('should be able to render many transactions', () => {
    const transactions = getTransactions();
    const transactionWrapper = mount(<TransactionTable transactions={transactions}/>);

    const transactionTable = transactionWrapper.find('table tbody');

    expect(transactionTable.find(TransactionRow)).toHaveLength(transactions.length);
  });
});