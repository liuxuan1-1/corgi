import * as React from 'react';
import { Form, Input, Button, Icon, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import axios from 'axios';
import { API_URL } from '../../../../../pagesConst';
import './index.scss';

interface IUserFormProps extends FormComponentProps {
}

class MyForm extends React.Component<IUserFormProps, {}> {

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="#">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="#">register now!</a>
        </Form.Item>
      </Form>
    )
  }

  protected handleSubmit = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios({
          data: values,
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          url: `${API_URL}/api/accounts/sign`,
          withCredentials: true,
        })
      }
    });
  }
}

export default Form.create({ name: 'login' })(MyForm);
