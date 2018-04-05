// @flow
import * as React from 'react';
import PostsContainer from '../containers/Posts';

type Props = {
  history: Object,
};

const Posts = (props: Props) => {
  const { history } = props;

  return <PostsContainer history={history} />;
};

export default Posts;
