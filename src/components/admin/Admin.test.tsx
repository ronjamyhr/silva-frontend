import { shallow } from 'enzyme';
import * as React from 'react';
import Admin from './Admin';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Bookings from './bookings/Bookings';

Enzyme.configure({ adapter: new Adapter() });

describe('Admin ', () => {

    it('renders without crashing', () => {
        shallow(<Admin />);
    });

    it('has a state of bookings', () =>   {
        const wrapper = shallow(<Admin/>);
        expect(wrapper.state()).toEqual({
            bookings: [],
            showBooking: false
        });
    });

    describe('Booking component ', () => {
        it('has props from parents state', () => {
            const wrapper = shallow(<Admin/>);
            wrapper.update(); 
            const bookings = wrapper.find(Bookings);
            expect(bookings.props().bookingsOnTime).toEqual(wrapper.state('bookings'));
        });
    });
    
});