// @flow
import * as React from 'react';

import PostContainer from '../containers/Post';

type Props = {
  match: Object,
};
const EditPost = (props: Props) => {
  return <PostContainer id={props.match.params.id} {...props} />;
};

export default EditPost;
