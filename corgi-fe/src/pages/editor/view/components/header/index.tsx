import * as React from 'react';
import { Layout, Button, Input, message } from 'antd';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
import './index.scss';


const {
  Header,
} = Layout;

interface Istates {
}

interface Iprops {
  store?: any,
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

  public handleClickSave = (): void => {
    axios({
      data: {
        ...this.props.store.data,
      },
      method: 'post',
      url: `${API_URL}/api/design/save`,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        message.success(`保存成功`);
      } else {
        message.error(`保存失败: ${result.message}`);
      }
    }).catch((e) => {
      message.error(`保存失败`);
      // tslint:disable-next-line: no-console
      console.error(`保存失败: ${JSON.stringify(e)}`)
    })
  }

  public render() {
    const { fileName } = this.props.store.data;
    return (
      <Header className="head-wrapper">
        <div className="head-left">
          <a href="/home.html">平面设计平台</a>
        </div>
        <div className="head-middle">
          <Input value={fileName} onChange={this.handleChangeFileName} />
        </div>
        <div className="head-right">
          <Button type="primary" onClick={this.handleClickSave}>保存</Button>
        </div>
      </Header>
    );
  }
}

export default MyHeader;
