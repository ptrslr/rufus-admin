// @flow
import * as React from 'react';

import PostsContainer from '../containers/Posts';
import status from '../constants/status';

type Props = {
  history: Object,
  status?: $Keys<typeof status>,
};

const Posts = (props: Props) => {
  return <PostsContainer {...props} />;
};

export default Posts;
