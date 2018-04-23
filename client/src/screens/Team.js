// @flow
import * as React from 'react';

import TeamContainer from '../containers/Team';

type Props = {
  history: Object,
};

const Team = (props: Props) => {
  const { history } = props;

  return <TeamContainer history={history} />;
};

export default Team;
