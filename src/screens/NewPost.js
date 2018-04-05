// @flow
import * as React from 'react';

import PostContainer from '../containers/Post';

type Props = {
  history: Object,
};
const NewPost = (props: Props) => {
  const { history } = props;

  return <PostContainer history={history} />;
};

export default NewPost;
