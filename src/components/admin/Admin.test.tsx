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
            bookings: [
                {
                    booking_id: 0,
                    booking_date: '',
                    sitting_time: 18,
                    number_of_guests_at_table: 0,
                    name_on_booking: '',
                    email_on_booking: ''
                }
            ]
        });
    });

    describe('Booking component ', () => {
        it('has props of parents state', () => {
            const wrapper = shallow(<Admin/>);
            wrapper.update(); 
            const bookingsOnTime = wrapper.find(Bookings);
            expect({bookings: bookingsOnTime.props().bookingsOnTime}).toEqual(wrapper.state());
        });
    });
    
});