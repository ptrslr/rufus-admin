// @flow
import * as React from 'react';

import PostsContainer from '../containers/Posts';
import status from '../constants/status';

type Props = {
  history: Object,
  category?: $Keys<typeof status>,
};

const Posts = (props: Props) => {
  const { history, category } = props;

  return <PostsContainer history={history} category={category} />;
};

export default Posts;
