import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout, Spin } from 'antd';
import MyHeader from './components/header/index';
import EditorContent from './components/editorContent/index';
import Face from '../../../components/face/index'

import axios from 'axios';
import { API_URL } from '../../../pagesConst';
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
    axios({
      method: 'get',
      url: `${API_URL}/api/accounts/getuserinfo`,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        props.store.setUserInfo({
          data: result.data.userInfo,
          success: true,
        });
        if (result.data.userInfo.faceOpen) {
          Face.startFace()
        }
      }
    }).catch((e) => {
      // message.error(`获取用户信息出错`);
      // tslint:disable-next-line: no-console
      // console.error(`获取用户信息出错: ${JSON.stringify(e)}`)
    })
  }
  
  public render() {
    const { exporting } = this.props.store;
    const { userInfo, faceCheck } = this.props.store;

    return (
      <div className="App">
        <Layout>
          <MyHeader />
          <Content className="content-wrapper">
            <EditorContent exporting={exporting.ok} />
          </Content>
          {
            userInfo.success && userInfo.data.faceOpen && !faceCheck ? (
              <Face />
            ) : null
          }
          {
            exporting.ok ? (
              <div className="spin-wrapper">
                <Spin size="large" tip={exporting.tips} />
              </div>
            ) : null
          }
        </Layout>
      </div>
    );
  }
}

export default App;
