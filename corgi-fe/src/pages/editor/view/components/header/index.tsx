import * as React from 'react';
import { Layout, Input, Menu, Dropdown, Icon, Modal, Select } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { inject, observer } from 'mobx-react';
import domtoimage from 'dom-to-image';

import FilePX from './filepx';
import './index.scss';

const confirm = Modal.confirm;
const Option = Select.Option;

const {
  Header,
} = Layout;

interface Istates {
}

interface Iprops {
  store?: any,
}

// 判断是design还是template文件
const pageParam = location.search.slice(1).split('&').map(e => e.split('='));
let isTemplateFile: boolean = false;
let isDesignFile: boolean = false;
if (Array.isArray(pageParam[0])) {
  if (pageParam[0][0] === 'templateid' && pageParam[0][1]) {
    isTemplateFile = true;
  } else if (pageParam[0][0] === "designid" && pageParam[0][1]) {
    isDesignFile = true;
  }
}

@inject('store')
@observer
class MyHeader extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }
  
  public exportImgType: string = 'jpeg';

  public handleChangeFileName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.store.setDesignData({
      fileName: e.target.value,
    })
  }

  public handleCategoryChange = (e: any): void => {
    this.props.store.setDesignData({
      category: e,
    })
  }

  public handleExportImgChange = (e: any): void => {
    this.exportImgType = e;
  }

  /**
   * 文件菜单点击事件
   */
  public handleClickFileMenu = (e: ClickParam) => {
    const { category = ['精品'], fileName } = this.props.store.data;
    const { setexporting } = this.props.store

    switch (e.key) {
      case "save":
        this.props.store.getSaveData();
        break;
      case "release":
        confirm({
          cancelText: '取消发布',
          content: (
            <Select defaultValue={category} mode="multiple" style={{ width: '100%' }} onChange={this.handleCategoryChange}>
              <Option value="精品">精品</Option>
              <Option value="其它">其它</Option>
            </Select>
          ),
          okText: '确定发布',
          onOk: () => {
            this.props.store.getRelease(true);
            this.props.store.getSaveData(true);
          },
          title: '选择分类',
        });
        break;
      case "unrelease":
        this.props.store.getRelease(false);
        break;
      case "export":
        confirm({
          cancelText: '取消',
          content: (
            <Select defaultValue={this.exportImgType} style={{ width: '100%' }} onChange={this.handleExportImgChange}>
              <Option value="jpeg">jpeg</Option>
              <Option value="png">png</Option>
            </Select>
          ),
          okText: '导出',
          onOk: () => {
            const target: any = document.getElementsByClassName('workspace')[0];
            if (target) {
              setexporting(true);
              if (this.exportImgType === 'jpeg') {
                domtoimage.toJpeg(target, { width: parseInt(target.style.width, 10), height: parseInt(target.style.height, 10)})
                  .then((dataUrl: string) => {
                    const link = document.createElement('a');
                    link.download = `${fileName}.jpeg`;
                    link.href = dataUrl;
                    link.click();
                    setexporting(false);
                  });
              } else if (this.exportImgType === 'png') {
                domtoimage.toPng(target, { width: parseInt(target.style.width, 10), height: parseInt(target.style.height, 10) })
                  .then((dataUrl: string) => {
                    const link = document.createElement('a');
                    link.download = `${fileName}.png`;
                    link.href = dataUrl;
                    link.click();
                    setexporting(false);
                  })
              }
            }
          },
          title: '选择分类',
        });


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
    this.props.store.setChangeFilepx(true);
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
        {
          isDesignFile ? (
            <Menu.Item key='export'>
              导出
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
