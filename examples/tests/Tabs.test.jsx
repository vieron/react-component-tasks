// DOCUMENTATION
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md

import React from 'react';
import { shallow } from 'enzyme';
import Tabs, { TabsNav } from 'Tabs';

const expect = chai.expect;


describe('<Tabs />', () => {
    it('should render the component', () => {
        const wrapper = shallow(<Tabs />);
        expect(wrapper.find(TabsNav)).to.have.length(1);
    })
});


describe('<TabsNav />', () => {
    it('should render the component', () => {
        const wrapper = shallow(<TabsNav />);
        expect(wrapper.find('a')).to.have.length(2);
    })
})
