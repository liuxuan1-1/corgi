import * as React from 'react';
import { message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';

interface Istates {
}

interface Iprops {
  data: {
    [propName: string]: any;
  }
}


class Card extends React.PureComponent<Iprops, Istates> {

  public readonly state: Readonly<Istates> = {
  }

  public handleClick = (e: React.MouseEvent):void => {
    const { data } = this.props;
    axios({
      method: 'get',
      params: {
        templateid: data._id,
      },
      url: `${API_URL}/api/design/create`,
      withCredentials: true,
    }).then((e) => {
      const result = e.data;
      if (result.success) {
        const tempwindow = window.open('_blank'); // 先打开页面
        if (tempwindow) {
          tempwindow.location.href = `/editor.html?designid=${result.data.designInfo._id}`;
        }
      } else {
        message.error(`创建文件失败: ${result.message}`);
      }
    }).catch((e) => {
      message.error(`创建文件请求失败`);
      // tslint:disable-next-line: no-console
      console.error(`创建文件请求失败: ${JSON.stringify(e)}`)
    })
  }

  public render() {
    const { data } = this.props;
    return (
      <div className="card-box-wrapper" onClick={this.handleClick}>
        <div className="card-img" style={{ backgroundImage: `url(${API_URL}/${data.coverUrl})` }} />
        <div className="card-content">
          <div className="card-name">
            {data.templateName}
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
