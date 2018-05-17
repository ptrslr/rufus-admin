// @flow
import * as React from 'react';

import TeamContainer from '../containers/Team';

type Props = {
  disabled: boolean,
};

const Team = (props: Props) => {
  return <TeamContainer {...props} />;
};

export default Team;
