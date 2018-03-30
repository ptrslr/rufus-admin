// @flow
import * as React from 'react';

import Sidebar from './containers/Navigation';
import Post from './screens/Post';

import { BrowserRouter, Route } from 'react-router-dom';
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
            <Route path="/" exact component={Post} />
          </LayoutMain>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
