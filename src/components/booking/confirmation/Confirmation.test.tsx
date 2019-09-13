import { shallow } from 'enzyme';
import * as React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Confirmation from './Confirmation';

Enzyme.configure({ adapter: new Adapter() });

describe('Confirmation component ', () => {

    const props = {
        customerInfo: []
    }

    it('renders without crashing', () => {
        shallow(<Confirmation {...props} />);
    });

});