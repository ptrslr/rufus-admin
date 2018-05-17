// @flow
import * as React from 'react';

import LoginContainer from '../containers/Login';

type Props = {
  onLogin: Function,
};

const Login = (props: Props) => {
  return <LoginContainer {...props} />;
};

export default Login;
