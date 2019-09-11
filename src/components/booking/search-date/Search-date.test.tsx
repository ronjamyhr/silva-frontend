import { shallow } from 'enzyme';
import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import SearchDate from './Search-date';
// import { IMapBookings } from './Search-date';

Enzyme.configure({ adapter: new Adapter() });

describe('Search-date component ', () => {

    const props = {
        timeSelected: jest.fn(),
        bookings: []
    }

    it('renders without crashing', () => {
        shallow(<SearchDate {...props}/>);
    });

    it('should set state after calling updateDate', () => {
        const component = shallow<SearchDate>(<SearchDate {...props} />);
        const date = "Fri Sep 20 2019 00:00:00 GMT+0200";
        component.instance().updateDate(date);
        expect(component.instance().state.date).toBe("Fri Sep 20 2019 00:00:00 GMT+0200");
    });

});