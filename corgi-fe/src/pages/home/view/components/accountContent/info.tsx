import * as React from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
import {
  Form, Input, Select, Button, Icon, message, Upload
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';


const { Option } = Select;

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 16 },
    xs: { span: 24 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      offset: 8,
      span: 16,
    },
    xs: {
      offset: 0,
      span: 24,
    },
  },
};

interface IUploadValue {
  name: string,
  url: string,
  status: string,
  uid: string,
  postUrl: string,
}

interface Iprops extends FormComponentProps {
  userInfo: {
    [propName: string]: any,
  },
}

interface Istate {
  loginButtonLoading: boolean,
}

class InfoForm extends React.Component<Iprops, Istate> {
  public readonly state: Istate = {
    loginButtonLoading: false,
  };
 
  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const params = {
          accountId: values.accountId,
          avatarUrl: '',
          faceUrl: '',
          nickName: values.nickName,
          phoneNum: `${values.prefix}${values.phoneNum}`,
        }

        // 如果是新上传的图片从返回结果里拿, 如果没有更改
        // 直接点击保存, 从缓存里拿
        if (Array.isArray(values.avatar) && values.avatar.length !== 0) {
          const avatar = values.avatar[0].response;
          if (avatar && avatar.success) {
            params.avatarUrl = avatar.data.file[0] || '';
          } else if (values.avatar[0].postUrl) {
            params.avatarUrl = values.avatar[0].postUrl;
          }

        }

        if (Array.isArray(values.face) && values.face.length !== 0) {
          const face = values.face[0].response;
          if (face && face.success) {
            params.faceUrl = face.data.file[0] || '';
          } else if (values.face[0].postUrl) {
            params.faceUrl = values.face[0].postUrl;
          }
        }

        axios({
          data: params,
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: `${API_URL}/api/accounts/update`,
          withCredentials: true,
        }).then((e) => {
          const result = e.data;
          this.setState({
            loginButtonLoading: false,
          });
          if (result.success) {
            message.success('修改成功');
          } else {
            message.error(`修改错误: ${result.message}`);
          }
        }).catch((e) => {
          message.error(`修改请求出错`);
          // tslint:disable-next-line: no-console
          console.error(`修改请求出错: ${JSON.stringify(e)}`)
        })
      }
    });
  }

  /**
   * 文件上传change时事件
   * @param e => 文件参数
   */
  public avatarNormFile = (e: any) => {
    // console.log('Upload event:', e);
    if (e.fileList && e.fileList[0] && e.fileList[0].response && !e.fileList[0].response.success ) {
      e.fileList[0].status = 'error';
      message.error(`上传错误: ${e.fileList[0].response.message}`);
    }
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  /**
   * 文件上传前的检测事件
   * @param file => 文件参数
   */
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

  /**
   * 文件数量检测
   */
  public checkAvatarUpload = ():boolean | undefined => {
    const result = this.props.form.getFieldValue('avatar')
    if (result) {
      return result.length >= 1
    }
    return false;
  }

  /**
   * 文件数量检测
   */
  public checkFaceUpload = (): boolean | undefined => {
    const result = this.props.form.getFieldValue('face')
    if (result) {
      return result.length >= 1
    }
    return false;
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { loginButtonLoading } = this.state;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );
    return (
      <Form onSubmit={this.handleSubmit} className="info-form">
        <Form.Item
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('accountId', {
            rules: [{ required: true, message: '用户名不能为空' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '姓名不能为空!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phoneNum', {
            rules: [{ required: true, message: '手机号码不能为空!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="头像"
        >
          {getFieldDecorator('avatar', {
            getValueFromEvent: this.avatarNormFile,
            valuePropName: 'fileList',
          })(
            <Upload
              beforeUpload={this.beforeUpload}
              name="avatar"
              action={`${API_URL}/api/img/uploadAvatar`}
              listType="picture-card"
              disabled={this.checkAvatarUpload()}
              withCredentials={true}
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="人脸识别头像"
        >
          {getFieldDecorator('face', {
            getValueFromEvent: this.avatarNormFile,
            valuePropName: 'fileList',
          })(
            <Upload
              beforeUpload={this.beforeUpload}
              name="face"
              action={`${API_URL}/api/img/uploadFace`}
              listType="picture-card"
              disabled={this.checkFaceUpload()}
              withCredentials={true}
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loginButtonLoading}
            style={{ width: '40%' }}
          >
            更新
          </Button>
        </Form.Item>

      </Form>
    );
  }
}

const WrappedInfoForm = Form.create({
  name: 'update',
  mapPropsToFields(props: any) {
    const result = props.userInfo.data;
    const avatarObj: IUploadValue[] | [] = [];
    const faceObj: IUploadValue[] | [] = [];

    if (result) {
      const fileRex = /(\\|\/)(\d+-\S+.(jpg|png))$/;
      if (result.avatarUrl) {
        let fileName = result.avatarUrl.match(fileRex)[2];
        fileName = fileName.split('-')[1];
        avatarObj[0] = {
          name: '',
          postUrl: '',
          status: '',
          uid: '',
          url: '',
        }
        avatarObj[0].name = fileName;
        avatarObj[0].url = `${API_URL}/${result.avatarUrl}`;
        avatarObj[0].postUrl = result.avatarUrl;
        avatarObj[0].uid = '-1';
        avatarObj[0].status = 'done';
      }

      if (result.faceUrl) {
        let fileName = result.faceUrl.match(fileRex)[2];
        fileName = fileName.split('-')[1];
        faceObj[0] = {
          name: '',
          postUrl: '',
          status: '',
          uid: '',
          url: '',
        }
        faceObj[0].name = fileName;
        faceObj[0].url = `${API_URL}/${result.faceUrl}`;
        faceObj[0].postUrl = result.faceUrl;
        faceObj[0].uid = '-1';
        faceObj[0].status = 'done';
      }
      return {
        accountId: Form.createFormField({
          value: result.accountId || '',
        }),
        avatar: Form.createFormField({
          value: avatarObj,
        }),
        face: Form.createFormField({
          value: faceObj,
        }),
        nickName: Form.createFormField({
          value: result.nickName || '',
        }),
        phoneNum: Form.createFormField({
          value: result.phoneNum || '',
        }),
      };
    }
    return {};
  },
})(InfoForm);

export default WrappedInfoForm;
