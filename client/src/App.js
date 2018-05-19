// @flow
import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseAuth } from './api';
import firebaseui from 'firebaseui';

import Loader from './components/Loader';
import Sidebar from './containers/Navigation';
import Posts from './screens/Posts';
import EditPost from './screens/EditPost';
import NewPost from './screens/NewPost';
import Categories from './screens/Categories';
import Team from './screens/Team';
import NewTeamMember from './screens/NewTeamMember';
import Login from './screens/Login';
import NoMatch from './screens/NoMatch';

import status from './constants/status';
import role from './constants/role';
import { colors } from './utils/theme';

const Layout = styled.div`
  display: flex;
  height: 100%;
  color: ${colors.black};
`;
const LayoutSidebar = styled.div`
  flex: 0 0 18rem;
  width: 18rem;
`;
const LayoutMain = styled.main`
  flex: 1 1 auto;
`;

type Props = {};
type State = {
  isLoading: boolean,
  user: ?Object,
  userRole: ?$Keys<typeof role>,
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
          this.setState({ userRole: idToken.claims.role });
        });
        this.setState({ user });
      }
      this.setState({ isLoading: false });
    });
  };

  onLogin = (authResult: firebaseui.auth.AuthResult) => {
    const user = authResult.user;

    this.setState({ user });
  };
  render() {
    return (
      <Loader isLoading={this.state.isLoading}>
        <BrowserRouter>
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
                      <Sidebar
                        user={this.state.user}
                        userRole={this.state.userRole}
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
                            <NewPost
                              user={this.state.user}
                              userRole={this.state.userRole}
                              {...props}
                            />
                          )}
                        />
                        <Route exact path="/posts/:id" component={EditPost} />

                        <Route
                          exact
                          path="/categories"
                          component={Categories}
                        />

                        <Redirect exact from="/team" to="/team/active" />

                        <Route
                          exact
                          path="/team/active"
                          render={props => <Team disabled={false} {...props} />}
                        />
                        <Route
                          exact
                          path="/team/disabled"
                          render={props => <Team disabled={true} {...props} />}
                        />

                        <Route
                          exact
                          path="/team/new-member"
                          component={NewTeamMember}
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
        </BrowserRouter>
      </Loader>
    );
  }
}

export default App;
