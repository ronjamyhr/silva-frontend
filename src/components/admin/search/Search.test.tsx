import { shallow } from 'enzyme';
import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Search from './Search';

Enzyme.configure({ adapter: new Adapter() });

describe('Search component ', () => {

    const props = {
        getBookings: jest.fn(),
    }

    it('renders without crashing', () => {
        shallow(<Search {...props}/>);
    });

    it('should call onChange for picking time', () => {
        const component = shallow<Search>(<Search {...props} />);
        const objectWithValue = { target: { value: 21 } };
        component.instance().updateTime(objectWithValue);
        expect(component.instance().state.time).toBe(21);
    });

    it('should call onChange for picking date', () => {
        const component = shallow<Search>(<Search {...props} />);
        const objectWithValue = { target: { value: "2019-08-29" } };
        component.instance().updateDate(objectWithValue);
        expect(component.instance().state.date).toBe("2019-08-29");
    });

});