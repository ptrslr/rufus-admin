// @flow
import * as React from 'react';

import Sidebar from './containers/Navigation';
import Posts from './screens/Posts';
import EditPost from './screens/EditPost';
import NewPost from './screens/NewPost';
import NoMatch from './screens/NoMatch';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
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
              <Route exact path="/" component={Posts} />
              <Route exact path="/posts" component={Posts} />

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
