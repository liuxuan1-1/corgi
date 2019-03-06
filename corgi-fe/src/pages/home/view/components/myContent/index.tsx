import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import { Menu, Button } from 'antd';
import List from './list';
import '../templateContent/index.scss';
import './index.scss';

interface Istates {
  menuCurrent: string,
}

interface Iprops {
  userInfo: {
    [propName: string]: any,
  }
}

class TemplateContent extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
    menuCurrent: 'info',
  }

  public handleMenuClick = (e: ClickParam): void => {
    if (e.key === 'btn-wrapper') {
      return;
    }
    this.setState({
      menuCurrent: e.key,
    });
  }

  public handleClickAddTem = (): void => {
    console.log(1123)
  }

  public render() {
    const { menuCurrent } = this.state;
    const { userInfo } = this.props;
    let showAddTemplteBtn: boolean = false;

    if (userInfo.success) {
      if (userInfo.data.permission === 'professional') {
        showAddTemplteBtn = true;
      }
    }

    return (
      <div className="template-content-wrapper my-content-wrapper">
        <Menu
          onClick={this.handleMenuClick}
          selectedKeys={[menuCurrent]}
          style={{ width: 256 }}
          className="left-menu"
        >
          <Menu.Item key="info">
            我的文件
          </Menu.Item>

          {
            showAddTemplteBtn? (
              <Menu.Item key="btn-wrapper">
                <Button type="primary" onClick={this.handleClickAddTem}>新增模板</Button>
              </Menu.Item>
            ) : null
          }
        </Menu>
        <List category={menuCurrent} />
      </div>
    )
  }
}

export default TemplateContent;
