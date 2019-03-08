import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import { Menu, Button, message } from 'antd';
import List from './list';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
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

    axios({
      method: 'get',
      url: `${API_URL}/api/template/create`,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        const tempwindow = window.open('_blank'); // 先打开页面
        if (tempwindow) {
          tempwindow.location.href = `/editor.html?templateid=${result.data.id}`;
        }
      } else {
        message.error(`创建失败: ${result.message}`);
      }
    }).catch((e) => {
      message.error(`创建模板请求出错`);
      // tslint:disable-next-line: no-console
      console.error(`创建模板请求出错: ${JSON.stringify(e)}`)
    })
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
              [
                <Menu.Item key="template">
                  我的模板
                </Menu.Item>
              ,
                <Menu.Item key="btn-wrapper">
                  <Button type="primary" onClick={this.handleClickAddTem}>新增模板</Button>
                </Menu.Item>
              ]
            ) : null
          }
        </Menu>
        <List category={menuCurrent} />
      </div>
    )
  }
}

export default TemplateContent;
