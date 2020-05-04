import Dashboard from "../components/Dashboard";
import {mount, shallow} from "enzyme";
import React from "react";

describe('Dashboard', () => {
    it('should render navigation bar', () => {
        const dashboard = shallow(<Dashboard/>);

        expect(dashboard.find('NavigationBar')).toHaveLength(1);
    });

    it('should render wallet', () => {
        const dashboard = shallow(<Dashboard/>);

        expect(dashboard.find('Wallet')).toHaveLength(1);
    });

    it('should render transaction table', () => {
        const dashboard = shallow(<Dashboard/>);

        expect(dashboard.find('TransactionTable')).toHaveLength(1);
    });

    it('should show deposit form', function () {
        const dashboard = shallow(<Dashboard/>);

        dashboard.instance().showDepositForm();

        expect(dashboard.find("#deposit-form").children().length).toEqual(1);
    });

    it('should contain input element for amount in deposit form', function () {
        const dashboard = shallow(<Dashboard/>);

        dashboard.instance().showDepositForm();

        expect(dashboard.find("#deposit-amount").children().length).toEqual(1);
    });

    it('should contain input element for remarks in deposit form', function () {
        const dashboard = shallow(<Dashboard/>);

        dashboard.instance().showDepositForm();

        expect(dashboard.find("#deposit-remarks").length).toEqual(1);
    });

    it('should contain close button in deposit form', function () {
        const dashboard = shallow(<Dashboard/>);

        dashboard.instance().showDepositForm();

        expect(dashboard.find("#close-deposit-form").length).toEqual(1);
    });

    it('should close deposit form when close button is clicked', function () {
        const dashboard = shallow(<Dashboard/>);

        dashboard.instance().showDepositForm();

        expect(dashboard.find("#close-deposit-form").length).toEqual(1);

        dashboard.find("#close-deposit-form").simulate('click');

        expect(dashboard.find("#close-deposit-form").length).toEqual(0)
    });
});
