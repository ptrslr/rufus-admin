// @flow
import * as React from 'react';
import styled from 'styled-components';
import firebaseui from 'firebaseui';
import { Link } from 'react-router-dom';

import AvatarBox from '../AvatarBox';
import Loader from '../Loader';

import role from '../../constants/role';
import { space, colors } from '../../constants/theme.js';

const StyledLink = styled(Link)`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: ${space[2]} ${space[2]};
  border-bottom: 1px solid ${colors.grays[1]};
  color: inherit;
  text-decoration: none;

  transition: color 150ms, background-color 150ms;
  outline: none;

  &:hover,
  &:focus,
  &.active {
    background-color: ${colors.grays[1]};
  }
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
    <StyledLink to="/account">
      <Loader isLoading={!props.user} size="2.25rem">
        <AvatarBox name={name} title={role} image={image} />
      </Loader>
    </StyledLink>
  );
};

export default Account;
