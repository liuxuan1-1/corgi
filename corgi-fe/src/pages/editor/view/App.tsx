import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Button } from 'antd';
import './App.scss';

import logo from './logo.svg';

@inject('store')
@observer
class App extends React.Component<any, any> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h1>====> {this.props.store.num}</h1>
        <div>
          <Button onClick={this.props.store.setAddNum}>home</Button>
        </div>
      </div>
    );
  }
}

export default App;
