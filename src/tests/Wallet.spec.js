import Wallet from '../components/Wallet';
import {shallow} from "enzyme";
import React from "react";
import WalletModel from "../models/WalletModel";

const transactions = [
  {id: 1, amount: 30, type: 'CREDIT', remarks: 'Add'},
  {id: 2, amount: 30, type: 'DEBIT', remarks: 'Withdraw'},
];

describe('Wallet', () => {

  it('should render without crashing',()=>{
    shallow(<Wallet transactions={transactions} loading={false} wallet={new WalletModel({balance: 30})}/>);
  });

  it('should show loading until response is returned', async () => {
    const walletResponse = new WalletModel({balance: 30});

    WalletModel.fetch = jest.fn();
    WalletModel.fetch.mockResolvedValue(walletResponse);

    const wallet = shallow(<Wallet loading={true} wallet={new WalletModel({balance: 30})}/>);

    const balance = wallet.find("#balance");
    expect(balance.text()).toEqual('Loading....');
  });


  it('should show balance 30', async () => {
    const walletResponse = new WalletModel({balance: 30});

    WalletModel.fetch = jest.fn();
    WalletModel.fetch.mockResolvedValue(walletResponse);

    const wallet = shallow(<Wallet loading={false} wallet={new WalletModel({balance: 30})}/>);

    await Promise.resolve();

    const balance = wallet.find("#balance");
    expect(balance.text()).toEqual("\u20B930");
  });

  it('should show Hi Riju, ', () => {
    const walletWrapper = shallow(<Wallet loading={false} wallet={new WalletModel({balance: 30})} transactions={transactions}/>);
    const userGreeting = walletWrapper.find('#userGreeting').text();

    expect(userGreeting).toEqual('Hi Riju');
  });
});
