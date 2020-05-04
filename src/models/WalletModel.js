import axios from "axios";

class WalletModel {
  constructor(attrs = {balance: 0}) {
    this._attrs = attrs;
  }

  balance() {
    return this._attrs.balance;
  }

  success(){
    return this._attrs.success;
  }

  message(){
    return this._attrs.message;
  }

  static async fetch(id) {

    const response = await axios.get(process.env.REACT_APP_WALLET_API_URL+"/wallets/" + id);
    return new WalletModel(response.data);
  }
}

export default WalletModel;
