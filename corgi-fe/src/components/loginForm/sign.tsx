import * as React from 'react';
import axios from 'axios';
import { API_URL } from '../../pagesConst';
import {
  Form, Input, Select, Button, Icon, message, Upload
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';


const { Option } = Select;

const formItemLayout = {
  labelCol: {
    sm: { span: 8 },
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


interface ISignFormProps extends FormComponentProps {
  callbackLoginFormClose: () => void
}

interface Istate {
  avatarUploadFileLength: number,
  confirmDirty: boolean,
  loginButtonLoading: boolean,
}

class SignForm extends React.Component<ISignFormProps, Istate> {
  public readonly state: Istate = {
    avatarUploadFileLength: 0,
    confirmDirty: false,
    loginButtonLoading: false,
  };

  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const params = {
          accountId: values.accountId,
          avatarUrl: '',
          nickName: values.nickName,
          password: values.password,
          phoneNum: `${values.prefix}${values.phoneNum}`,
        }

        const avatar = values.avatar[0].response;
        console.log(avatar)
        if (avatar.data.ok) {
          params.avatarUrl = avatar.data.file[0] || '' ;
        }

        axios({
          data: params,
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: `${API_URL}/api/accounts/sign`,
          withCredentials: true,
        }).then((e) => {
          const result = e.data;
          this.setState({
            loginButtonLoading: false,
          });
          if (result.success) {
            if (result.data.ok) {
              message.success('注册成功');
              this.props.callbackLoginFormClose();
            } else {
              message.error(`注册失败: ${result.message}`);
            }
          } else {
            message.error(`注册请求出错: ${result.message}`);
          }
        }).catch((e) => {
          message.error(`注册请求出错`);
          // tslint:disable-next-line: no-console
          console.error(`注册请求出错: ${JSON.stringify(e)}`)
        })
      }
    });
  }

  public handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  public compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }

  public validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  public handleCloseClick = ():void => {
    this.props.callbackLoginFormClose();
    return
  }

  public avatarNormFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      this.setState({
        avatarUploadFileLength: e.length,
      });
      return e;
    }
    this.setState({
      avatarUploadFileLength: e.fileList.length,
    });
    return e && e.fileList;
  }

  public beforeUpload = (file: any): boolean | PromiseLike<any> => {
    console.log(file);
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

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { loginButtonLoading, avatarUploadFileLength } = this.state;
    // console.log(this.props.form.getFieldValue('avatar'));
    const prefixSelector = getFieldDecorator('prefix', {  
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit} className="login-form sign-form">
        <Form.Item
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('accountId', {
            rules: [{
              message: '请输入用户名!',
              required: true,
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              message: '请输入密码!',
              required: true,
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="再次输入密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              message: '请输入密码!',
              required: true,
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phoneNum', {
            rules: [{ required: true, message: '请输入手机号码!' }],
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
              disabled={avatarUploadFileLength >= 1}
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
            style={{ width: '40%'}}
          >
            注册
          </Button>
        </Form.Item>
        <Icon type="close" className="login-form-close" onClick={this.handleCloseClick} />

      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(SignForm);

export default WrappedRegistrationForm;
