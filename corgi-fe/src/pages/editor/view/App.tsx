import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout, Spin } from 'antd';
import MyHeader from './components/header/index';
import EditorContent from './components/editorContent/index';
import './App.scss';

const {
  Content,
} = Layout;

@inject('store')
@observer
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.store.getFetchData();
  }
  
  public render() {
    const { exporting } = this.props.store;
    return (
      <div className="App">
        <Layout>
          <MyHeader />
          <Content className="content-wrapper">
            <EditorContent exporting={exporting} />
          </Content>
          {
            exporting ? (
              <div className="spin-wrapper">
                <Spin size="large" tip="导出中..." />
              </div>
            ) : null
          }
        </Layout>
      </div>
    );
  }
}

export default App;
