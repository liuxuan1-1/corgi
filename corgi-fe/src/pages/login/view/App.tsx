import * as React from 'react';
import { inject, observer } from 'mobx-react'
// import { Layout, Form, Input } from 'antd';
import Ceshi from '../../../components/test';
import './App.scss';

interface Istates {
  count: number,
}

@inject('store')
@observer
class App extends React.Component<{}, Istates> {
  public state = {
    count: 0,
  }

  public render() {
    return (
      <div className="App">
        123
        <Ceshi />
      </div>
    );
  }
}

export default App;
