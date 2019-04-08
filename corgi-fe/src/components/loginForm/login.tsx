import * as React from 'react';
import { Form, Input, Button, Icon, Checkbox, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import axios from 'axios';
import { API_URL } from '../../pagesConst';

interface IUserFormProps extends FormComponentProps {
  callbackLoginFormClose: (result?: IcallbackLoginFormCloseParam) => void
}

interface Istates {
  loginButtonLoading: boolean,
}

class LoginForm extends React.Component<IUserFormProps, Istates> {
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
          const result = e.data;
          this.setState({
            loginButtonLoading: false,
          });
          if (result.success) {
            message.success('登录成功');
            this.props.callbackLoginFormClose({
              data: result.data.userInfo,
              success: true,
            });
          } else {
            message.error(`登录失败: ${result.message}`);
          }
        }).catch((e) => {
          this.setState({
            loginButtonLoading: false,
          });
          message.error(`登录请求出错`);
          // tslint:disable-next-line: no-console
          console.error(`登录请求出错: ${JSON.stringify(e)}`)
        })
      } else {
        this.setState({
          loginButtonLoading: false,
        });
      }
    });
  }

  public handleCloseClick = (): void => {
    this.props.callbackLoginFormClose();
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { loginButtonLoading } = this.state;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('accountId', {
              rules: [{
                message: '请输入用户名!',
                required: true,
              }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{
                message: '请输入密码!',
                required: true,
              }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
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
            {/* Or <a href="#">注册!</a> */}
          </Form.Item>
          <Icon type="close" className="login-form-close" onClick={this.handleCloseClick} />
        </Form>
    )
  }
}

export default Form.create({ name: 'login' })(LoginForm);
