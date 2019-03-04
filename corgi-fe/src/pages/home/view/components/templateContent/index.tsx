import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import { Menu } from 'antd';
import List from './list';
import './index.scss';

interface Istates {
  menuCurrent: string,
}

interface Iprops {
}

class TemplateContent extends React.Component<Iprops, Istates> {
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
      <div className="template-content-wrapper">
        <Menu
          onClick={this.handleMenuClick}
          selectedKeys={[menuCurrent]}
          style={{ width: 256 }}
          className="left-menu"
        >
          <Menu.Item key="info">
            精选
          </Menu.Item>
          <Menu.Item key="other">
            其它
          </Menu.Item>
        </Menu>
        <List category={menuCurrent} />
      </div>
    )
  }
}

export default TemplateContent;
