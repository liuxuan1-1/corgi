import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import MyHeader from '../../components/header/index';
import LoginForm from '../../../../../components/loginForm/index';
import Face from '../../../../../components/face/index'

import HomeContent from '../../components/homeContent/index';
import AccountContent from '../../components/accountContent/index';
import TemplateContent from '../../components/templateContent/index';
import MyContent from '../../components/myContent/index';
import AboutContent from '../../components/aboutContent/index';

import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
import './app.scss';


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
  }

  public handleHeadLoginClick = (e: React.MouseEvent):void => {
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
      if (result.data.faceOpen) {
        Face.startFace()
      }
    }

    return
  }

  public callbackUserExit = (): void => {
    this.props.store.setUserInfo({});
  }

  public BodyClassName = (): string => {
    const result = window.location.hash;
    switch (result) {
      case '#/':
        return 'App';
      case '#/account':
        return 'account-wrapper';
      case '#/template':
        return 'template-wrapper';
      case '#/mine':
        return 'my-wrapper';
      case '#/about':
        return 'about-wrapper';
      default:
        return '';
    }
  }

  public renderContent = (): React.ReactNode | null => {
    const result = window.location.hash;
    const { userInfo } = this.props.store;
    switch (result) {
      case '#/':
        return <HomeContent />
      case '#/account':
        return (
          <AccountContent
            userInfo={userInfo}
          />
        )
      case '#/template':
        return <TemplateContent />
      case '#/mine':
        return (
          <MyContent
            userInfo={userInfo}
          />
        )
      case '#/about':
        return <AboutContent />
      default:
        return null;
    }
  }

  public render() {
    const { loginFormShow, loginFormVisible } = this.state;
    const { userInfo, faceCheck } = this.props.store;
    const MyHeadProps: {
      myClassName?: string,
    } = {}
    if (window.location.hash !== '#/') {
      MyHeadProps.myClassName = "not-home"
    }
    return (
      <div className={this.BodyClassName()}>
        <Layout>
          <MyHeader
            callbackUserExit={this.callbackUserExit}
            handleHeadLoginClick={this.handleHeadLoginClick}
            handleHeadSignClick={this.handleHeadSignClick}
            userInfo={userInfo}
            {...MyHeadProps}
          />
          <Content className="content-wrapper">
            {this.renderContent()}
          </Content>
        </Layout>
        {
          userInfo.success && userInfo.data.faceOpen && !faceCheck ? (
            <Face />
          ) : null
        }
        {
          window.location.hash === '#/' ? (
            <div className="home-bk">
              <img src={`${API_URL}/corgi/public/img/web/banner-BG_line.png`} />
            </div>
          ) : null
        }
        {
          loginFormVisible? (
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
