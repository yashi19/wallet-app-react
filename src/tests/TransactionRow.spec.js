import TransactionRow from "../components/TransactionRow";
import {shallow} from "enzyme";
import React from "react";

describe('Single transaction', () => {
    it('should display date as 1st Jan 2019 for 2019-01-01', () => {
        const transaction = {id: 1, date: "2019-01-01", amount: 100, type: 'Credit', remarks: 'Add 100'};
        const transactionElement = shallow(<TransactionRow transaction={transaction}/>).find('tr');

        expect(transactionElement.childAt(0).text()).toEqual('1st  Jan 2019');
    });

    it('should display date as 2nd Dec 2019 for 2019-12-02', () => {
        const transaction = {id: 1, date: "2019-12-02", amount: 100, type: 'Credit', remarks: 'Add 100'};
        const transactionElement = shallow(<TransactionRow transaction={transaction}/>).find('tr');

        expect(transactionElement.childAt(0).text()).toEqual('2nd  Dec 2019');
    });

    it('should display single transaction data', () => {
        const transaction = {id: 1, date: "2019-07-10", amount: 100, type: 'Credit', remarks: 'Add 100'};
        const transactionElement = shallow(<TransactionRow transaction={transaction}/>).find('tr');

        expect(transactionElement.find('td')).toHaveLength(4);
        expect(transactionElement.childAt(0).text()).toEqual('10th  Jul 2019');
        expect(transactionElement.childAt(1).text()).toEqual('Credit');
        expect(transactionElement.childAt(2).text()).toEqual('100');
        expect(transactionElement.childAt(3).text()).toEqual('Add 100');
    });

    it('should be assigned #credit-amount id for credit transactions', () => {
        const transaction = {id: 1, date: "2019-07-10", amount: 100, type: 'Credit', remarks: 'Add 100'};
        const transactionElement = shallow(<TransactionRow transaction={transaction}/>).find('tr');

        expect(transactionElement.childAt(2).props().id).toEqual('credit-amount');
    });

    it('should be assigned #debit-amount id for credit transactions', () => {
        const transaction = {id: 1, date: "2019-07-10", amount: 100, type: 'Debit', remarks: 'Add 100'};
        const transactionElement = shallow(<TransactionRow transaction={transaction}/>).find('tr');

        expect(transactionElement.childAt(2).props().id).toEqual('debit-amount');
    });
});