// @flow
import * as React from 'react';

import NoMatchContainer from '../containers/NoMatch';

type Props = {
  history: Object,
};

const NoMatch = (props: Props) => {
  const { history } = props;

  return <NoMatchContainer history={history} />;
};

export default NoMatch;
