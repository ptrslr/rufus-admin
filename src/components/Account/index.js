// @flow
import * as React from 'react';
import styled from 'styled-components';

import AvatarBox from '../AvatarBox';
import { space, grays } from '../../utils/theme';

const Wrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: ${space[2]} ${space[2]};
  border-bottom: 1px solid ${grays[2]};
`;

const Account = () => (
  <Wrapper>
    <AvatarBox name="Sarah Schmidt" title="Editor" image="" />
  </Wrapper>
);

export default Account;
