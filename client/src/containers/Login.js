// @flow
import * as React from 'react';
import firebase, { auth, provider } from '../api';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import styled from 'styled-components';

import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { heading } from '../components/Typography';

import icons from '../constants/icons';
import { colors } from '../utils/theme';

const Wrapper = styled.div`
  padding: 3rem 1rem;
`;
const Header = styled.header`
  margin: 0 0 2rem;
  text-align: center;
`;
const Title = styled.h1`
  ${heading};
`;
const Subtitle = styled.p``;

const Form = styled.div`
  text-align: center;
`;

type Props = {
  history: Object,
  onLogin: Function,
};
type State = {};

class Login extends React.Component<Props, State> {
  ui: Object;

  constructor(props: Props) {
    super(props);

    this.state = {};

    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (
        authResult: firebaseui.auth.AuthResult,
        redirectUrl: string
      ) => {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.

        this.props.onLogin(authResult);

        return true;
      },
      uiShown: () => {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
  };

  componentDidMount = async () => {
    this.ui.start('#firebaseui-auth-container', this.uiConfig);
  };

  render() {
    return (
      <Wrapper>
        <Header>
          <Title>Login</Title>
          <Subtitle>You need to be logged-in to continue</Subtitle>
        </Header>

        <Form>
          <div id="firebaseui-auth-container" />
          <div id="loader">Loading...</div>
        </Form>
      </Wrapper>
    );
  }
}

export default Login;
