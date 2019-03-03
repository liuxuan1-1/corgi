import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import { Menu } from 'antd';
import './index.scss';

interface Istates {
  menuCurrent: string,
}

interface Iprops {
}

class AccountContent extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
    menuCurrent: 'info',
  }

  public handleMenuClick = (e: ClickParam): void => {
    this.setState({
      menuCurrent: e.key,
    });
  }

  public render() {
    const { menuCurrent } = this.state;

    return (
      <div className="account-content-wrapper">
        <Menu
          onClick={this.handleMenuClick}
          selectedKeys={[menuCurrent]}
          style={{ width: 256 }}
          className="left-menu"
        >
          <Menu.Item key="info">
            个人信息
          </Menu.Item>
          <Menu.Item key="setting">
            设置
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default AccountContent;
