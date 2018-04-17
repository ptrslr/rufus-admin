// @flow
import * as React from 'react';

import LoginContainer from '../containers/Login';

type Props = {
  history: Object,
  onLogin: Function,
};

const Login = (props: Props) => {
  const { history, onLogin } = props;

  return <LoginContainer history={history} onLogin={onLogin} />;
};

export default Login;
