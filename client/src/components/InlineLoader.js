// @flow
import * as React from 'react';
import { ClipLoader } from 'halogenium';
import styled from 'styled-components';

import { colors } from '../constants/theme.js';

const Wrapper = styled.div`
  padding: 0 0.725em;

  display: ${props => (props.isLoading ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;
const Icon = styled(ClipLoader)`
  padding-top: .1em;
  margin-right: 0.5rem;
`;

type Props = {
  isLoading: boolean,
  label?: string,
  size?: string,
};
const InlineLoader = (props: Props) => {
  const { isLoading, label, size } = props;

  return (
    <Wrapper isLoading={isLoading}>
      <Icon color={colors.primary} size={size ? size : '1rem'} />
      {label}
    </Wrapper>
  );
};

export default InlineLoader;
