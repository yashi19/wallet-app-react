import axios from "axios";
import WalletModel from "./WalletModel";

class TransactionModel {
    constructor(attrs) {
        this._attrs = attrs;
    }

    transactions() {
        return this._attrs;
    }

    static async fetch(id) {
        const response = await axios.get( process.env.REACT_APP_WALLET_API_URL + "/wallets/"+ id + "/transactions");
        return new TransactionModel(response.data);
    }

    static async createTransaction(id, transaction) {
        try{
            const response = await axios.post( process.env.REACT_APP_WALLET_API_URL + "/wallets/"+ id + "/transactions", transaction);
            let wallet = response.data;
            wallet['success'] = true;
            return new WalletModel(wallet);
        }
        catch(exception){
            let response = {};
            response['message'] = exception.response.data;
            response['success'] = false;
            return new WalletModel(response);
        }
    }

    static async fetchRecentTransactions(id, noOfTransactions) {
        const response = await axios.get( process.env.REACT_APP_WALLET_API_URL + "/wallets/"+ id + "/transactions?noOfTransactions=" + noOfTransactions);
        return new TransactionModel(response.data);
    }

    static async fetchTransactionsByMonthAndYear(id, month, year) {
        const response = await axios.get( process.env.REACT_APP_WALLET_API_URL + "/wallets/"+ id + "/transactions?month=" + month + "&year=" + year);
        return new TransactionModel(response.data);
    }

    static async fetchTransactionsByType(id, type) {
        const response = await axios.get(process.env.REACT_APP_WALLET_API_URL + "/wallets/" + id + "/transactions?type=" + type);
        return new TransactionModel(response.data);
    }

    static async fetchTransactionsByTypeAndMonthAndYear(id, type, month, year) {
        const response = await axios.get(process.env.REACT_APP_WALLET_API_URL + "/wallets/" + id + "/transactions?month=" + month + "&year=" + year + "&type=" + type);
        return new TransactionModel(response.data);
    }
}

export default TransactionModel;
