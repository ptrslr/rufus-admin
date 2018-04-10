// @flow
import * as React from 'react';

import PostContainer from '../containers/Post';

type Props = {
  match: Object,
  history: Object,
};
const EditPost = (props: Props) => {
  const { match, history } = props;

  return <PostContainer id={match.params.id} history={history} />;
};

export default EditPost;
