// @flow
import * as React from 'react';

import NewTeamMemberContainer from '../containers/NewTeamMember';

type Props = {
  history: Object,
};

const NewTeamMember = (props: Props) => {
  const { history } = props;

  return <NewTeamMemberContainer history={history} />;
};

export default NewTeamMember;
