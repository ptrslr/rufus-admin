// @flow
import * as React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseAuth } from './../api';

import Posts from './Posts';
import Post from './Post';
import Categories from './Categories';
import Pages from './Pages';
import Page from './Page';
import Team from './Team';
import NewTeamMember from './NewTeamMember';
import MyAccount from './MyAccount';
import Login from './Login';

import Navigation from '../components/Navigation';
import NoMatch from '../components/NoMatch';
import Loader from '../components/Loader';

import status from '../constants/status';
import role from '../constants/role';
import { colors } from '../constants/theme.js';

const Layout = styled.div`
  display: flex;
  height: 100%;
  color: ${colors.black};
`;
const LayoutSidebar = styled.div`
  flex: 0 0 16rem;
  width: 16rem;
`;
const LayoutMain = styled.main`
  flex: 1 1 auto;
`;

type Props = {
  history: Object,
};
type State = {
  isLoading: boolean,
  isUnauthorized?: boolean,
  user: ?Object,
  userRole: ?$Values<typeof role>,
};

class App extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: null,
      userRole: null,
    };
  }

  componentDidMount = () => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        firebaseAuth.currentUser.getIdTokenResult().then(idToken => {
          if (idToken.claims.role) {
            this.setState({
              user,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              userRole: idToken.claims.role,
            });
          } else {
            this.setState({
              isUnauthorized: true,
            });
          }

          this.setState({ isLoading: false });
        });
      } else {
        this.setState({ isLoading: false });
      }
    });
  };

  onUserUpdate = () => {
    const user = firebaseAuth.currentUser;
    this.setState({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  };

  onLogout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        console.log('Signed Out');
        this.props.history.push('/login');
      })
      .catch(error => {
        console.error('Sign Out Error', error);
      });
  };

  //   onLogin = (authResult: firebaseui.auth.AuthResult) => {
  //     const user = authResult.user;
  //
  //     isTeamMember(user.uid).then(teamMember => {
  //       if (teamMember) {
  //         this.setState({ user });
  //       }
  //     });
  //   };
  render() {
    let name = null;

    if (this.state.user) {
      name = this.state.displayName ? this.state.displayName : this.state.email;
    }

    return (
      <Loader isLoading={this.state.isLoading}>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => <Login onLogin={this.onLogin} {...props} />}
          />

          {this.state.user ? (
            <Route
              path="/*"
              render={() => (
                <Layout>
                  <LayoutSidebar>
                    <Navigation
                      name={name}
                      image={this.state.photoURL}
                      role={this.state.userRole}
                      onLogout={this.onLogout}
                    />
                  </LayoutSidebar>
                  <LayoutMain>
                    <Switch>
                      <Redirect exact from="/" to="/posts/all" />
                      <Redirect exact from="/posts" to="/posts/all" />

                      <Route exact path="/posts/all" component={Posts} />
                      <Route
                        exact
                        path="/posts/drafts"
                        render={props => (
                          <Posts status={status.DRAFT} {...props} />
                        )}
                      />
                      <Route
                        exact
                        path="/posts/published"
                        render={props => (
                          <Posts status={status.PUBLISHED} {...props} />
                        )}
                      />
                      <Route
                        exact
                        path="/posts/scheduled"
                        render={props => (
                          <Posts
                            status={status.PUBLISHED}
                            scheduled={true}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/posts/hidden"
                        render={props => (
                          <Posts status={status.HIDDEN} {...props} />
                        )}
                      />

                      <Route
                        exact
                        path="/posts/new-post"
                        render={props => (
                          <Post
                            user={this.state.user}
                            userRole={this.state.userRole}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/posts/:id"
                        render={props => (
                          <Post
                            user={this.state.user}
                            userRole={this.state.userRole}
                            {...props}
                          />
                        )}
                      />

                      <Route
                        exact
                        path="/categories"
                        render={props => (
                          <Categories
                            userRole={this.state.userRole}
                            {...props}
                          />
                        )}
                      />

                      <Route exact path="/pages" component={Pages} />

                      <Route
                        exact
                        path="/pages/new-page"
                        render={props => (
                          <Page userRole={this.state.userRole} {...props} />
                        )}
                      />

                      <Route
                        exact
                        path="/pages/:id"
                        render={props => (
                          <Page userRole={this.state.userRole} {...props} />
                        )}
                      />

                      <Redirect exact from="/team" to="/team/active" />

                      <Route
                        exact
                        path="/team/active"
                        render={props => (
                          <Team
                            disabled={false}
                            userRole={this.state.userRole}
                            {...props}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/team/disabled"
                        render={props => (
                          <Team
                            disabled={true}
                            userRole={this.state.userRole}
                            {...props}
                          />
                        )}
                      />

                      {this.state.userRole === role.ADMIN && (
                        <Route
                          exact
                          path="/team/new-member"
                          component={NewTeamMember}
                        />
                      )}

                      <Route
                        exact
                        path="/account"
                        render={props => (
                          <MyAccount
                            user={this.state.user}
                            userRole={this.state.userRole}
                            onUserUpdate={this.onUserUpdate}
                            {...props}
                          />
                        )}
                      />

                      <Route component={NoMatch} />
                    </Switch>
                  </LayoutMain>
                </Layout>
              )}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </Loader>
    );
  }
}

export default withRouter(App);
