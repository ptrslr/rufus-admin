// @flow
import * as React from 'react';

import TeamContainer from '../containers/Team';

type Props = {
  history: Object,
  disabled: boolean,
};

const Team = (props: Props) => {
  const { history, disabled } = props;

  return <TeamContainer history={history} disabled={disabled} />;
};

export default Team;
