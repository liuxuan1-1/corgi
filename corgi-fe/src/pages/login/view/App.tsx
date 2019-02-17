import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd';
import Form from './components/from';
import './App.scss';

const {
  Header, Content,
} = Layout;
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
        <Layout>
          <Header>平面设计平台</Header>
          <Content>
            <div className="form-wrapper">
              <Form />
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
