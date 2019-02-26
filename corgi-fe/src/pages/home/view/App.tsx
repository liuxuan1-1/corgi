import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout, Button, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import HomeContent from './components/content/index';
import LoginForm from '../../../components/loginForm/index';
import { API_URL } from '../../../pagesConst';
import './App.scss';


const {
  Header, Content,
} = Layout;
interface Istates {
  loginFormShow: string,
  menuCurrent: string,
  loginFormVisible: boolean,
}

@inject('store')
@observer
class App extends React.Component<{}, Istates> {
  public readonly state: Readonly<Istates> = {
    loginFormShow: '',
    loginFormVisible: false,
    menuCurrent: '0',
  }

  public handleMenuClick = (e: ClickParam):void => {
    this.setState({
      menuCurrent: e.key,
    });
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

  public callbackLoginFormClose = (): void => {
    this.setState({
      loginFormVisible: false,
    })
    return;
  }

  public render() {
    const { menuCurrent, loginFormShow, loginFormVisible } = this.state;
    return (
      <div className="App">
        <Layout>
          <Header className="head-wrapper">
            <div className="head-left">平面设计平台</div>
            <div className="head-middle">
              <Menu
                onClick={this.handleMenuClick}
                selectedKeys={[menuCurrent]}
                style={{ lineHeight: '62px' }}
                mode="horizontal"
              >
                <Menu.Item key="template">
                  模板中心
                </Menu.Item>
                <Menu.Item key="about">
                  关于
                </Menu.Item>
              </Menu>
            </div>
            <div className="head-right">
              <Button className="login-btn" ghost={true} onClick={this.handleHeadLoginClick}>登录</Button>
              <Button ghost={true} onClick={this.handleHeadSignClick}>注册</Button>
            </div>
          </Header>
          <Content className="content-wrapper">
            <HomeContent />
          </Content>
        </Layout>
        <div className="home-bk">
          <img src={`${API_URL}/corgi/public/img/web/banner-BG_line.png`} />
        </div>
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
