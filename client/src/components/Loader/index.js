// @flow
import * as React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'halogenium';

import { colors } from '../../utils/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

type Props = {
  isLoading: boolean,
  children: React.Node,
};

const Loader = (props: Props) => {
  if (props.isLoading) {
    return (
      <Wrapper>
        <ClipLoader color={colors.primary} size="3rem" />
      </Wrapper>
    );
  }
  return props.children;
};

export default Loader;
