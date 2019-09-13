import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import { MemoryRouter} from 'react-router'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './components/home/Home';
import NotFound from './components/not-found/Not-found';

Enzyme.configure({ adapter: new Adapter() });

describe('routes using memory router', () => {
  window.scrollTo = jest.fn();

  it('should show Home component for / router (using memory router)', () => {
    const component = mount( <MemoryRouter initialEntries = {['/']} >
        <App/>
      </MemoryRouter>
    );
    expect(component.find(Home)).toHaveLength(1);
    
  });

  it('should show Not Found component for route not defined', () => {

    const component = mount( <MemoryRouter initialEntries = {['/unknown']} >
        <NotFound/>
      </MemoryRouter>
    );
    expect(component.find(NotFound)).toHaveLength(1);

  });

});