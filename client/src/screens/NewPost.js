// @flow
import * as React from 'react';

import PostContainer from '../containers/Post';
import role from '../constants/role';

type Props = {
  user: ?Object,
  userRole: ?$Keys<typeof role>,
};
const NewPost = (props: Props) => {
  return <PostContainer {...props} />;
};

export default NewPost;
