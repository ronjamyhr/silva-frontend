import React from 'react';
import Booking from './Booking';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
window.scrollTo = jest.fn();

describe('Booking', () => {

    it('should render without crashing', () => {
        shallow(<Booking />);
    });

    it('has a state of showBooking', () => {
        const wrapper = shallow(<Booking />);
        expect(wrapper.state()).toEqual({
            bookings: [
                {
                    booking_id: 0,
                    booking_date: '',
                    sitting_time: 0,
                    number_of_guests_at_table: 0,
                    name_on_booking: '',
                    email_on_booking: ''
                }
            ],
            showBooking: false,
            showConfirm: false,
            dateAndTime: {
                time: 0,
                date: ""
            },
            customerDetails: {
                name: '',
                date: '',
                time: 0
            }
            
        });
    });
});