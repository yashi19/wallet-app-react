import {shallow} from "enzyme/build";
import React from "react";
import NavigationBar from "../components/NavigationBar";

describe("Nav Bar", ()=> {
    it('should render', ()=>{
        const navigationBarWrapper = shallow(<NavigationBar/>);

        expect(navigationBarWrapper.exists()).toBe(true);
    });

    it('should have a logo', ()=>{
        const navigationBarWrapper = shallow(<NavigationBar/>);
        const logoWrapper = navigationBarWrapper.find('img');

        expect(logoWrapper.exists()).toBe(true);
    });

});
