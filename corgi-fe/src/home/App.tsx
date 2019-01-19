import * as React from 'react';
import { Button } from 'antd';
import './App.scss';

import logo from './logo.svg';

interface IProps {
  name: string;
  enthusiasmLevel?: number;
}

class App extends React.Component<IProps> {
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
        <div>
          <Button>coanima</Button>
        </div>
      </div>
    );
  }
}

export default App;
