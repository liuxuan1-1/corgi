import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from '../components/homeContent/index';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('home 页', () => {

  it('页面快照', () => {
    const wrapper = mount(<Home />);
    expect(wrapper.render()).toMatchSnapshot();
  })
})

