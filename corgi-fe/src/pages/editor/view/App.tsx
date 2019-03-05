import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd';
import MyHeader from './components/header/index';
import EditorContent from './components/editorContent/index';
import './App.scss';

const {
  Content,
} = Layout;

@inject('store')
@observer
class App extends React.Component<any, any> {
  
  public render() {
    return (
      <div className="App">
        <Layout>
          <MyHeader />
          <Content className="content-wrapper">
            <EditorContent />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
