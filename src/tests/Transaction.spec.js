import {shallow} from "enzyme";
import React from "react";
import Transaction from "../components/Transaction";

describe('Transaction', () => {

    it('should render without crashing',()=>{
        const transaction = shallow(<Transaction />);

        expect(transaction.exists()).toBe(true);
    });
});