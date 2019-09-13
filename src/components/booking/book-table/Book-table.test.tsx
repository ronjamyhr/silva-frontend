import { shallow } from 'enzyme';
import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import BookTable from './Book-table';

Enzyme.configure({ adapter: new Adapter() });

describe('Book-table component ', () => {

    const props = {
        customerInfo: jest.fn(),
        dateTime: []
    }

    it('renders without crashing', () => {
        shallow(<BookTable {...props} />);
    });

    it('should get value from search-date component', () => {
        const component = shallow<BookTable>(<BookTable {...props} />);
        expect(component.instance().state.date).not.toBe('');
    });

});