// @flow
import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from './containers/Navigation';
import Posts from './screens/Posts';
import EditPost from './screens/EditPost';
import NewPost from './screens/NewPost';
import NoMatch from './screens/NoMatch';

import status from './constants/status';
import { colors } from './utils/theme';

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

class App extends React.Component<Props> {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <LayoutSidebar>
            <Sidebar />
          </LayoutSidebar>
          <LayoutMain>
            <Switch>
              <Redirect exact from="/" to="/posts/all" />
              <Redirect exact from="/posts" to="/posts/all" />

              <Route exact path="/posts/all" component={Posts} />
              <Route
                exact
                path="/posts/drafts"
                render={() => <Posts category={status.DRAFT} />}
              />
              <Route
                exact
                path="/posts/published"
                render={() => <Posts category={status.PUBLISHED} />}
              />
              <Route
                exact
                path="/posts/scheduled"
                render={() => <Posts category={status.SCHEDULED} />}
              />
              <Route
                exact
                path="/posts/hidden"
                render={() => <Posts category={status.HIDDEN} />}
              />

              <Route exact path="/posts/new-post" component={NewPost} />
              <Route exact path="/posts/:id" component={EditPost} />

              <Route component={NoMatch} />
            </Switch>
          </LayoutMain>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
