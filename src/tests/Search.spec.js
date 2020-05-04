import {shallow} from "enzyme/build";
import React from "react";
import Search from "../components/Search";

describe("Search Box", ()=> {
  it('should render', ()=>{
    const searchWrapper = shallow(<Search/>);

    expect(searchWrapper.exists()).toBe(true);
  });

  it('should have a search box', ()=>{
    const searchWrapper = shallow(<Search/>);
    const searchBox = searchWrapper.find('#filterRemarks');

    expect(searchBox.exists()).toBe(true);
  });

  it('should be able to take input from user', ()=>{
    let onSearchCallCount = 0;
    const mockOnSearch = () => {
      onSearchCallCount++;
    };
    const mockSearchHandler = jest.fn();
    const searchWrapper = shallow(<Search onSearch={mockOnSearch}/>);
    const searchBox = searchWrapper.find('input');

    searchBox.simulate('change',{target:{value:'Add'}});

    expect(onSearchCallCount).toEqual(1);
  });

});
