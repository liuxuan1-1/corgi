import * as React from 'react';
import LoginForm from './login';
import SignForm from './sign';
import './index.scss';

interface IUserFormProps {
  loginFormShow: string,
  callbackLoginFormClose: (result: IcallbackLoginFormCloseParam) => void
}


class LoginOrSignForm extends React.Component<IUserFormProps, {}> {
  public static defaultProps = {
    loginFormShow: 'login'
  };

  public handleCloseClick = (result: IcallbackLoginFormCloseParam = {
    data: {},
    success: false,
  }): void => {
    this.props.callbackLoginFormClose(result);
  }

  public render() {
    const { loginFormShow } = this.props;
    return (
      <div className="login-form-wrapper">
        {loginFormShow === 'login' ? (
          <LoginForm callbackLoginFormClose={this.handleCloseClick} />
        ) : null}
        {loginFormShow === 'sign' ? (
          <SignForm callbackLoginFormClose={this.handleCloseClick} />
        ) : null}
      </div>
    )
  }
}

export default LoginOrSignForm;
