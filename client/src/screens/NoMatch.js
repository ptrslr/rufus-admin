// @flow
import * as React from 'react';

import NoMatchContainer from '../containers/NoMatch';

type Props = {
  history: Object,
};

const NoMatch = (props: Props) => {
  return <NoMatchContainer {...props} />;
};

export default NoMatch;
