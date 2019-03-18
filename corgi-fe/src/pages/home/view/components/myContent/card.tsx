import * as React from 'react';
import { Icon, message, Modal } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';

interface Istates {
}

interface Iprops {
  data: {
    [propName: string]: any;
  },
  fetchData: () => void,
  category: string,
}

const confirm = Modal.confirm;

class Card extends React.PureComponent<Iprops, Istates> {

  public readonly state: Readonly<Istates> = {
  }

  public handleClick = (e: React.MouseEvent):void => {
    const { data, category } = this.props;
    const tempwindow = window.open('_blank'); // 先打开页面
    if (tempwindow) {
      if (category === 'info') {
        tempwindow.location.href = `/editor.html?designid=${data._id}`;
      } else if (category === 'template') {
        tempwindow.location.href = `/editor.html?templateid=${data._id}`;
      }
    }
  }

  /**
   * 文件删除
   */
  public handleDeleteClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    const { data, fetchData, category } = this.props;

    let url = `${API_URL}/api/design/delete`;
    if (category === 'info') {
      url = `${API_URL}/api/design/delete`;
    } else if (category === 'template') {
      url = `${API_URL}/api/template/delete`;
    }

    confirm({
      cancelText: '取消',
      content: '',
      okText: '确定',
      title: '确定要删除这个文件吗?',
      onOk() {
        axios({
          method: 'get',
          params: {
            id: data._id,
          },
          url,
          withCredentials: true,
        }).then((e) => {
          const result = e.data;
          if (result.success) {
            message.success(`删除成功`);
            fetchData();
          } else {
            message.error(`删除失败`);
          }
        }).catch((e) => {
          message.error(`删除请求出错`);
          // tslint:disable-next-line: no-console
          console.error(`删除请求出错: ${JSON.stringify(e)}`)
        })
      },
    });

  }

  public render() {
    const { data } = this.props;
    return (
      <div className="card-box-wrapper" onClick={this.handleClick}>
        <div className="card-img" style={{ backgroundImage: `url(${API_URL}/${data.coverUrl})` }} />
        <div className="card-content">
          <div className="card-name">
            {data.designName || data.templateName}
          </div>
          <div className="card-delete">
            <Icon type="delete" onClick={this.handleDeleteClick} />
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
