import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { API_URL } from '../../../../../pagesConst';
import './index.scss';

interface Iprops {
  avatarUrl: string,
  callbackUserExit: () => void,
}

interface Istates {
}

class CircleUser extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public handleMenuClick = (e: ClickParam): void => {
    switch (e.key) {
      case 'info':
        break;
      case 'exit':
        axios({
          method: 'get',
          url: `${API_URL}/api/accounts/exit`,
          withCredentials: true,
        }).then((e) => {
          const result = e.data;
          if (result.success) {
            this.props.callbackUserExit();
          }
        }).catch((e) => {
          // message.error(`获取用户信息出错`);
          // tslint:disable-next-line: no-console
          console.error(`获取用户信息出错: ${JSON.stringify(e)}`)
        })
        break;
    }
  }

  public renderMenu = (): React.ReactNode => {
    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key='info'>
          <Link to="/account">个人信息</Link>
        </Menu.Item>
        <Menu.Item key='exit'>
          退出
        </Menu.Item>
      </Menu>
    )
  }

  public render() {
    const { avatarUrl } = this.props;
    return (
      <div className="circle-user-wrapper">
        <Dropdown overlay={this.renderMenu()}>
          {
            avatarUrl === '' || !avatarUrl ? (
              <Avatar icon="user" />
            ) : (
              <Avatar src={`${API_URL}/${avatarUrl}`} />
            )
          }
        </Dropdown>
      </div>
    );
  }
}

export default CircleUser;
