// @flow
import * as React from 'react';
import firebase, { auth, provider } from '../api/firebase.js';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import InlineLoader from '../components/InlineLoader';
import Loader from '../components/Loader';
import Button from '../components/Button';

import icons from '../constants/icons';
import { colors } from '../utils/theme';

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

        return false;
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
      <div>
        <h1>Login</h1>
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
