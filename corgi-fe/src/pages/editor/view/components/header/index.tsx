import * as React from 'react';
import { Layout, Input, Menu, Dropdown, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { inject, observer } from 'mobx-react';
import FilePX from './filepx';
import './index.scss';

const {
  Header,
} = Layout;

interface Istates {
}

interface Iprops {
  store?: any,
}

const pageParam = location.search.slice(1).split('&').map(e => e.split('='));
let isTemplateFile: boolean = false;
if (Array.isArray(pageParam[0])) {
  if (pageParam[0][0] === 'templateid' && pageParam[0][1]) {
    isTemplateFile = true;
  }
}

@inject('store')
@observer
class MyHeader extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  public handleChangeFileName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.store.setDesignData({
      fileName: e.target.value,
    })
  }

  /**
   * 文件菜单点击事件
   */
  public handleClickFileMenu = (e: ClickParam) => {
    switch (e.key) {
      case "save":
        this.props.store.getSaveData();
        break;
      case "release":
        this.props.store.getRelease(true);
        break;
      case "unrelease":
        this.props.store.getRelease(false);
        break;
      default:
        break;
    }
  }

  /**
   * 文件尺寸大小改变, 要改变两处, 
   * 一个是root的size, 还有一个是root的css的width和height
   */
  public callbackFilePXChange = (e: {
    x?: number,
    y?: number
  }):void => {
    const info = { ...this.props.store.data.info }
    const size = info.root.size;
    let result = [0,0];
    if (size) {
      result = size.split('*');
    }

    if (e.x) {
      result[0] = e.x;
      if (info.root.css) {
        info.root.css.width = `${e.x}px`;
      }
    } else if (e.y) {
      result[1] = e.y;
      if (info.root.css) {
        info.root.css.height = `${e.y}px`;
      }
    }

    info.root.size = result.join('*');
    this.props.store.setDesignData({
      info,
    })
  }

  public render() {
    const { fileName, info, isRelease } = this.props.store.data;
    const DropMenu = (
      <Menu onClick={this.handleClickFileMenu}>
        <Menu.Item key='save'>
          保存
        </Menu.Item>
        {
          isTemplateFile && isRelease === false ? (
            <Menu.Item key='release'>
              发布
            </Menu.Item>
          ) : null
        }
        {
          isTemplateFile && isRelease === true ? (
            <Menu.Item key='unrelease'>
              取消发布
            </Menu.Item>
          ) : null
        }
      </Menu>
    );

    return (
      <Header className="head-wrapper">
        <div className="head-left">
          <a href="/home.html">平面设计平台</a>
        </div>
        <div className="head-middle">
          <Input value={fileName} onChange={this.handleChangeFileName} />
        </div>
        <div className="head-right">
          <FilePX data={info.root} disabled={!isTemplateFile} callbackFilePXChange={this.callbackFilePXChange} />
          <Dropdown overlay={DropMenu}>
            <a className="ant-dropdown-link" href="#">
              文件 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

export default MyHeader;
