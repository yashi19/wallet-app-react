import axios from 'axios';
import WalletModel from "../models/WalletModel";

jest.mock('axios');

describe('WalletModel', () => {
  it.skip('should fetch from api', () => {
    WalletModel.fetch(1).then(response => console.log(response))
        .catch(error => console.log(error));

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8083/wallets/1')
  });

  it('should fetch balance from api', async () => {
    axios.get.mockResolvedValue({data: {balance: 27500}});
    const walletModel = await WalletModel.fetch(1);

    expect(walletModel.balance()).toEqual(27500);
  });
});
