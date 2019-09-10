import React from 'react';
import Bookings from './Booking';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import ReactDOM from 'react-dom';
import Booking from './Booking';

Enzyme.configure({ adapter: new Adapter() });

it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Booking />, div);
    ReactDOM.unmountComponentAtNode(div);
});

