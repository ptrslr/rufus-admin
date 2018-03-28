// @flow
import * as React from 'react';
import styled from 'styled-components';

import PostContainer from '../../containers/Post';
import PostSidebar from '../../containers/PostSidebar';

const Layout = styled.div`
  display: flex;
  height: 100%;
`;
const LayoutSidebar = styled.div`
  flex: 0 0 15rem;
  width: 15rem;
`;
const LayoutMain = styled.main`
  flex: 1 1 auto;
`;

const Post = () => {
  return (
    <Layout>
      <LayoutMain>
        <PostContainer />
      </LayoutMain>
      <LayoutSidebar>
        <PostSidebar />
      </LayoutSidebar>
    </Layout>
  );
};

export default Post;
