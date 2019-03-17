import * as React from 'react';
import { Upload, Icon, message, Button, Modal } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import axios from 'axios';
import { API_URL } from '../../../pagesConst';

interface Istates {
}

interface Iprops {
  getMaterialImgList: () => void,
  callbackChangeMaterial: (e: {
    type: string,
    target: string,
  }) => void
  materialImgList: Array<{
    _id: string,
    type: string,
    url: string,
  }>,
}

const confirm = Modal.confirm;

class Mine extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
  }

  constructor(props: Iprops) {
    super(props);
    props.getMaterialImgList();
  }

  public beforeUpload = (file: any): boolean | PromiseLike<any> => {
    const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImg) {
      message.error('只能上传jpg, png类型的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M');
    }
    return isImg && isLt2M;
  }

  public handleUploadChange = (e: UploadChangeParam) => {
    const { getMaterialImgList } = this.props;
    if (e.file.response && e.file.response.success) {
      getMaterialImgList();
    }
  }

  public handleClickDeleteMaterialImg = (e: React.MouseEvent) => {
    const { getMaterialImgList } = this.props;
    e.stopPropagation();
    if (e.currentTarget) {
      const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
      if (target.dataset.id) {
        confirm({
          cancelText: '取消',
          content: '',
          okText: '确定',
          title: '确定要删除这张图片吗?',
          onOk() {
            axios({
              method: 'get',
              params: {
                id: target.dataset.id,
              },
              url: `${API_URL}/api/img/delete`,
              withCredentials: true,
            }).then((e) => {
              const result = e.data;
              if (result.success) {
                message.success(`删除成功`);
                getMaterialImgList();
              } else {
                message.error(`删除失败: ${result.message}`);
              }
            }).catch((e) => {
              message.error(`删除图片请求失败`);
              // tslint:disable-next-line: no-console
              console.error(`删除图片请求失败: ${JSON.stringify(e)}`)
            })
          },
        });
      }
    }
  }

  public handleClickItem = (e: React.MouseEvent) => {
    const { callbackChangeMaterial } = this.props;
    if (e.currentTarget) {
      const target: HTMLDivElement = e.currentTarget as HTMLDivElement;
      if (target.dataset.id) {
        callbackChangeMaterial({
          target: target.dataset.id,
          type: 'img',
        })
      }
    }
  }

  public render() {
    const { materialImgList } = this.props;
    const { } = this.state;

    return (
      <div className="mine-wrapper">
        <div className="mine-upload-wrapper">
          <Upload
            beforeUpload={this.beforeUpload}
            name="mine"
            action={`${API_URL}/api/img/uploadMaterial`}
            onChange={this.handleUploadChange}
            withCredentials={true}
            showUploadList={false}
          >
            <Button className="upload-btn" block={true}>
              <Icon type="upload" /> 上传文件
            </Button>
          </Upload>
          <p className="tips">注意: 只能上传jpg, png类型的图片, 且不大于2M</p>
        </div>
        <div className="mine-body-wrapper">
          {
            materialImgList.map((e: {
              _id: string,
              type: string,
              url: string,
            }) => {
              return (
                <div key={e._id} className="mine-item" data-id={e._id} onClick={this.handleClickItem} style={{ backgroundImage: `url(${API_URL}/${e.url})` }}>
                  <ul className="item-menu">
                    <li className="item-menu-item" data-id={e._id} onClick={this.handleClickDeleteMaterialImg}><Icon type="delete" /></li>
                  </ul>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Mine;
