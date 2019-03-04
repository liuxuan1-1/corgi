import * as React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import CircleUser from '../circleUser/index';
import './index.scss';


const {
  Header,
} = Layout;

interface Istates {
  menuCurrent: string,
}

interface Iprops {
  userInfo: any,
  myClassName?: string,
  callbackUserExit: () => void,
  handleHeadLoginClick: (e: React.MouseEvent) => void,
  handleHeadSignClick: (e: React.MouseEvent) => void,
}

class MyHeader extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
    menuCurrent: '0',
  }

  public handleMenuClick = (e: ClickParam): void => {
    this.setState({
      menuCurrent: e.key,
    });
  }

  public handleHeadLoginClick = (e: React.MouseEvent): void => {
    this.props.handleHeadLoginClick(e);
    return
  }

  public handleHeadSignClick = (e: React.MouseEvent): void => {
    this.props.handleHeadSignClick(e);
    return
  }

  public callbackUserExit = (): void => {
    this.props.callbackUserExit();
  }

  /**
   * 根据路由选择点击状态
   */
  public switchMenuSelect = (): string[] => {
    const result = window.location.hash;
    switch (result) {
      case '#/template':
        return ['template']
      case '#/mine':
        return ['mine']
      case '#/about':
        return ['about']
      default:
        return [''];
    }
  }

  public render() {
    const { userInfo, myClassName } = this.props;
    return (
      <Header className={`head-wrapper ${myClassName}`}>
        <div className="head-left">
          <Link to="/">平面设计平台</Link>
        </div>
        <div className="head-middle">
          <Menu
            onClick={this.handleMenuClick}
            selectedKeys={this.switchMenuSelect()}
            style={{ lineHeight: '62px' }}
            mode="horizontal"
          >
            <Menu.Item key="template">
              <Link to="/template">模板中心</Link>
            </Menu.Item>
            {
              userInfo.success ? (
                <Menu.Item key="mine">
                  <Link to="/mine">我的</Link>
                </Menu.Item>
              ) : null
            }
            <Menu.Item key="about">
              <Link to="/about">关于</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="head-right">
          {
            userInfo.success ? (
              <CircleUser
                avatarUrl={userInfo.data.avatarUrl}
                callbackUserExit={this.callbackUserExit}
              />
            ) : (
                <>
                  <Button
                    className="login-btn"
                    ghost={myClassName !== 'not-home'}
                    onClick={this.handleHeadLoginClick}
                    type={myClassName !== 'not-home'? 'default' : 'primary'}
                  >
                    登录
                  </Button>
                  <Button ghost={myClassName !== 'not-home'} onClick={this.handleHeadSignClick}>注册</Button>
                </>
              )
          }
        </div>
      </Header>
    );
  }
}

export default MyHeader;
