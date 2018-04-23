// @flow
import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from './api/firebase.js';
import firebaseui from 'firebaseui';

import Loader from './components/Loader';
import Sidebar from './containers/Navigation';
import Posts from './screens/Posts';
import EditPost from './screens/EditPost';
import NewPost from './screens/NewPost';
import Categories from './screens/Categories';
import Team from './screens/Team';
import Login from './screens/Login';
import NoMatch from './screens/NoMatch';

import status from './constants/status';
import { colors } from './utils/theme';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  color: ${colors.black};
`;
const Layout = styled.div`
  display: flex;
  height: 100%;
  color: ${colors.black};
`;
const LayoutSidebar = styled.div`
  flex: 0 0 15rem;
  width: 15rem;
`;
const LayoutMain = styled.main`
  flex: 1 1 auto;
`;

type Props = {};
type State = {
  isLoading: boolean,
  user: ?Object,
};

class App extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: null,
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
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
              render={history => (
                <Login history={history} onLogin={this.onLogin} />
              )}
            />

            {this.state.user ? (
              <Route
                path="/*"
                render={() => (
                  <Layout>
                    <LayoutSidebar>
                      <Sidebar user={this.state.user} />
                    </LayoutSidebar>
                    <LayoutMain>
                      <Switch>
                        <Redirect exact from="/" to="/posts/all" />
                        <Redirect exact from="/posts" to="/posts/all" />

                        <Route exact path="/posts/all" component={Posts} />
                        <Route
                          exact
                          path="/posts/drafts"
                          render={history => (
                            <Posts history={history} status={status.DRAFT} />
                          )}
                        />
                        <Route
                          exact
                          path="/posts/published"
                          render={history => (
                            <Posts
                              history={history}
                              status={status.PUBLISHED}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/posts/scheduled"
                          render={history => (
                            <Posts
                              history={history}
                              status={status.SCHEDULED}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/posts/hidden"
                          render={history => (
                            <Posts history={history} status={status.HIDDEN} />
                          )}
                        />

                        <Route
                          exact
                          path="/posts/new-post"
                          component={NewPost}
                        />
                        <Route exact path="/posts/:id" component={EditPost} />

                        <Route
                          exact
                          path="/categories"
                          component={Categories}
                        />
                        <Route exact path="/team" component={Team} />

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
