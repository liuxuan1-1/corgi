import * as React from 'react';
import { Form, Input, Button, Icon, Checkbox, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import axios from 'axios';
import { API_URL } from '../../pagesConst';
import './index.scss';

interface IUserFormProps extends FormComponentProps {
  loginFormShow: string,
  callbackLoginFormClose: () => void
}

interface Istates {
  loginButtonLoading: boolean,
}

class MyForm extends React.Component<IUserFormProps, Istates> {
  public static defaultProps = {
    loginFormShow: 'login'
  };

  public readonly state: Istates = {
    loginButtonLoading: false,
  }

  

  public handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.setState({
      loginButtonLoading: true,
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        axios({
          data: values,
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: `${API_URL}/api/accounts/login`,
          withCredentials: true,
        }).then((e) => {
          console.log(e);
          const result = e.data;
          this.setState({
            loginButtonLoading: false,
          });
          if (result.success) {
            if (result.data.ok) {
              message.success('登录成功');
              this.props.callbackLoginFormClose();
            } else {
              message.error(`登录失败: ${result.message}`);
            }
          } else {
            message.error(`登录请求出错: ${result.message}`);
          }
        }).catch((e) => {
          message.error(`登录请求出错`);
          // tslint:disable-next-line: no-console
          console.error(`登录请求出错: ${JSON.stringify(e)}`)
        })
      }
    });
  }

  public handleCloseClick = ( ): void => {
    this.props.callbackLoginFormClose();
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { loginButtonLoading } = this.state;
    return (
      <div className="login-form-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('accountId', {
              rules: [{
                message: 'Please input your username!',
                required: true,
              }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{
                message: 'Please input your Password!',
                required: true,
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Checkbox>记住我</Checkbox>
            )}
            {/* <a className="login-form-forgot" href="#">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loginButtonLoading}>
              登录
            </Button>
            Or <a href="#">注册!</a>
          </Form.Item>
          <Icon type="close" className="login-form-close" onClick={this.handleCloseClick} />
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(MyForm);
