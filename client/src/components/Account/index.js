// @flow
import * as React from 'react';
import styled from 'styled-components';
import firebaseui from 'firebaseui';

import AvatarBox from '../AvatarBox';
import Loader from '../Loader';

import role from '../../constants/role';
import { space, grays } from '../../constants/theme.js';

const Wrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: ${space[2]} ${space[2]};
  border-bottom: 1px solid ${grays[1]};
`;

type Props = {
  user: ?firebaseui.User,
  userRole: ?$Keys<typeof role>,
};
const Account = (props: Props) => {
  let name = null;
  let role = null;
  let image = null;

  if (props.user != null) {
    name = props.user.displayName ? props.user.displayName : props.user.email;
    role = props.userRole;
    image = props.user.photoURL;
  }

  return (
    <Wrapper>
      <Loader isLoading={!props.user} size="2.25rem">
        <AvatarBox name={name} title={role} image={image} />
      </Loader>
    </Wrapper>
  );
};

export default Account;
