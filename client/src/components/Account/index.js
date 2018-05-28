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
  name: string,
  role: $Values<typeof role>,
  image: string,
};
const Account = (props: Props) => {
  return (
    <StyledLink to="/account">
      <Loader isLoading={!props.role} size="2.25rem">
        <AvatarBox name={props.name} title={props.role} image={props.image} />
      </Loader>
    </StyledLink>
  );
};

export default Account;
