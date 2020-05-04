import axios from "axios";
import TransactionModel from "../models/TransactionModel";

jest.mock('axios');

describe('Transaction Model', () => {
    it.skip('should hit transactions api without query parameter', async () => {
        TransactionModel.fetch(1).then(response => console.log(response))
            .catch(error => console.log(error));

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8083/wallets/1/transactions');
    });

    it('should fetch all transactions from api', async () => {
        axios.get.mockResolvedValue({
            data: [{
                amount: 100,
                date: "2019-07-10",
                id: 1,
                remarks: "snacks",
                type: "CREDIT"
            }]
        });
        const transactionModel = await TransactionModel.fetch(1);

        expect(transactionModel.transactions().length).toEqual(1);
    });

    it('should fetch all transactions from api', async () => {
        const responseData = [{amount: 100, date: "2019-07-10", id: 1, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 2, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 3, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 4, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 5, remarks: "snacks", type: "CREDIT"}];
        axios.get.mockResolvedValue({data: responseData});
        const transactionModel = await TransactionModel.fetchRecentTransactions(1);

        expect(transactionModel.transactions().length).toEqual(5);
    });

    it.skip('should hit transactions api with query parameter', async () => {
        TransactionModel.fetchRecentTransactions(1, 5).then(response => console.log(response))
            .catch(error => console.log(error));

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8083/wallets/1/transactions?noOfTransactions=5');
    });

    it.skip('should hit transactions api with month and year query parameter', async () => {
        TransactionModel.fetchTransactionsByMonthAndYear(1, 7, 2019).then(response => console.log(response))
            .catch(error => console.log(error));

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8083/wallets/1/transactions?month=7&year=2019');
    });

    it('should fetch all transactions from api', async () => {
        const responseData = [{amount: 100, date: "2019-07-10", id: 1, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 2, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 3, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 4, remarks: "snacks", type: "CREDIT"},
            {amount: 100, date: "2019-07-10", id: 5, remarks: "snacks", type: "CREDIT"}];
        axios.get.mockResolvedValue({data: responseData});
        const transactionModel = await TransactionModel.fetchTransactionsByMonthAndYear(1, 7, 2019);

        expect(transactionModel.transactions().length).toEqual(5);
    });
});