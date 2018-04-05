// @flow
import * as React from 'react';
import styled from 'styled-components';
import { ellipsis } from 'polished';

import Button from '../Button';
import Icon from '../Icon';
import icons from '../../constants/icons';
import statusType from '../../constants/status';
import { colors } from '../../utils/theme';

const Wrapper = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid ${colors.grays[2]};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
`;
const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
  font-size: 1.5rem;
`;
const Label = styled.div`
  ${ellipsis()};

  flex: 1 1 auto;
  font-weight: 700;
`;

type Props = {
  status: $Keys<typeof statusType>,
};
const Status = (props: Props) => {
  let icon = '';
  let label = '';
  let color = colors.black;
  let backgroundColor = '#ffffff';

  switch (props.status) {
    case statusType.PUBLISHED:
      icon = icons.VISIBILITY;
      label = 'Published';

      color = '#008638';
      backgroundColor = '#e3f9ec';
      break;
    case statusType.HIDDEN:
      icon = icons.VISIBILITY_OFF;
      label = 'Hidden';

      color = '#86000b';
      backgroundColor = '#faeaeb';
      break;
    case statusType.SCHEDULED:
      icon = icons.CLOCK;
      label = 'Scheduled';
      backgroundColor = '#FFFDE7';
      break;
    default:
      icon = icons.EDIT;
      label = 'Draft';

      color = '#004d84';
      backgroundColor = '#e4f0f9';
  }
  return (
    <Wrapper color={color} backgroundColor={backgroundColor}>
      <Info>
        {icon && <StyledIcon name={icon} />}
        <Label>{label}</Label>
      </Info>
      <Button theme="primary" size="lg" block={true} value="Publish" />
    </Wrapper>
  );
};

export default Status;
