import React from 'react';
import Booking from './Booking';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });


describe('Booking', () => {

    it('should render without crashing', () => {
        shallow(<Booking />);
    });

    it('has a state of showBooking', () => {
        const wrapper = shallow(<Booking />);
        expect(wrapper.state()).toEqual({
            bookings: [],
            showBooking: false,
            dateAndTime: {
                time: 0,
                date: ""
            }

        });
    });
});