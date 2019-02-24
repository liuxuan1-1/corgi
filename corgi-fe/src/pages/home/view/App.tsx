import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout, Button, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import HomeContent from './components/content';
import './App.scss';


const {
  Header, Content,
} = Layout;
interface Istates {
  menuCurrent: string,
}

@inject('store')
@observer
class App extends React.Component<{}, Istates> {
  public readonly state: Readonly<Istates> = {
    menuCurrent: '0',
  }

  public handleMenuClick = (e: ClickParam):void => {
    this.setState({
      menuCurrent: e.key,
    });
  }

  public render() {
    const { menuCurrent } = this.state;
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
              <Button className="login-btn" ghost={true}>登录</Button>
              <Button ghost={true}>注册</Button>
            </div>
          </Header>
          <Content className="content-wrapper">
            <HomeContent />
          </Content>
          <div className="home-bk" />
        </Layout>
      </div>
    );
  }
}

export default App;
