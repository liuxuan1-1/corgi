import * as React from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
import {
  Form, Switch, Button, message
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';


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

interface Iprops extends FormComponentProps {
}

interface Istate {
  loginButtonLoading: boolean,
}

class SettingForm extends React.Component<Iprops, Istate> {
  public readonly state: Istate = {
    loginButtonLoading: false,
  };

  public handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const params = {
          faceOpen: false,
        }

        axios({
          data: params,
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: `${API_URL}/api/accounts/update123123`,
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

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { loginButtonLoading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="info-form">
        <Form.Item
          {...formItemLayout}
          label="开启人脸登录"
        >
          {getFieldDecorator('faceOpen', {
          })(
            <Switch />
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

const WrappedSettingForm = Form.create({ name: 'setting' })(SettingForm);

export default WrappedSettingForm;
