import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd';
import MyHeader from '../../components/header/index';
import LoginForm from '../../../../../components/loginForm/index';
import AccountContent from '../../components/accountContent/index';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
import './index.scss';


const {
  Content,
} = Layout;

interface Istates {
  loginFormShow: string,
  loginFormVisible: boolean,
}

@inject('store')
@observer
class App extends React.Component<any, Istates> {
  public readonly state: Readonly<Istates> = {
    loginFormShow: '',
    loginFormVisible: false,
  }

  constructor(props: any) {
    super(props);

    if (!props.store.userInfo.success) {
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
        }
      }).catch((e) => {
        // message.error(`获取用户信息出错`);
        // tslint:disable-next-line: no-console
        // console.error(`获取用户信息出错: ${JSON.stringify(e)}`)
      })
    }
  }

  public handleHeadLoginClick = (e: React.MouseEvent): void => {
    this.setState({
      loginFormShow: 'login',
      loginFormVisible: true,
    })
    return
  }

  public handleHeadSignClick = (e: React.MouseEvent): void => {
    this.setState({
      loginFormShow: 'sign',
      loginFormVisible: true,
    })
    return
  }

  public callbackLoginFormClose = (result: IcallbackLoginFormCloseParam): void => {
    this.setState({
      loginFormVisible: false,
    })

    if (result.success) {
      this.props.store.setUserInfo(result);
    }

    return
  }

  public callbackUserExit = (): void => {
    this.props.store.setUserInfo({});
  }

  public render() {
    const { loginFormShow, loginFormVisible } = this.state;
    const { userInfo } = this.props.store;
    return (
      <div className="account-wrapper">
        <Layout>
          <MyHeader
            myClassName="not-home"
            callbackUserExit={this.callbackUserExit}
            handleHeadLoginClick={this.handleHeadLoginClick}
            handleHeadSignClick={this.handleHeadSignClick}
            userInfo={userInfo}
          />
          <Content className="content-wrapper">
            <AccountContent
              userInfo={userInfo}
            />
          </Content>
        </Layout>

        {
          loginFormVisible ? (
            <LoginForm
              loginFormShow={loginFormShow}
              callbackLoginFormClose={this.callbackLoginFormClose}
            />
          ) : null
        }
      </div>
    );
  }
}

export default App;
