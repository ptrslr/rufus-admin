// @flow
import * as React from 'react';
import styled from 'styled-components';
import { ellipsis } from 'polished';
import moment from 'moment';

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
const StyledButton = styled(Button)`
  & + & {
    margin-top: 0.5rem;
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  /*padding: 0 0.5rem;*/
  margin-bottom: 1rem;
`;
const StyledIcon = styled(Icon)`
  margin-right: 0.5rem;
  font-size: 1.5rem;
`;
const Label = styled.div`
  /*${ellipsis()};*/

  flex: 1 1 auto;
  font-weight: 700;
`;

type Props = {
  status: $Keys<typeof statusType>,
  publishTime: ?number,
  onPublish: Function,
  onHide: Function,
};
const Status = (props: Props) => {
  let icon = '';
  let label = '';
  let color = colors.black;
  let backgroundColor = '#ffffff';

  const isPublished =
    props.status === statusType.PUBLISHED &&
    props.publishTime &&
    props.publishTime <= Date.now();

  const isScheduled =
    props.status === statusType.PUBLISHED &&
    props.publishTime &&
    props.publishTime > Date.now();

  const isHidden = props.status === statusType.HIDDEN;

  const isDraft = props.status === statusType.DRAFT;

  if (isPublished) {
    icon = icons.VISIBILITY;
    label = 'Published';

    color = '#008638';
    backgroundColor = '#e3f9ec';
  } else if (isScheduled && props.publishTime) {
    icon = icons.CLOCK;
    label = (
      <span>
        Scheduled for<br /> {moment(props.publishTime).format('lll')}
      </span>
    );
    backgroundColor = '#FFFDE7';
  } else if (isHidden) {
    icon = icons.VISIBILITY_OFF;
    label = 'Hidden';

    color = '#86000b';
    backgroundColor = '#faeaeb';
  } else {
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

      <div>
        {isPublished && (
          <StyledButton
            theme="primary"
            block={true}
            value="Hide"
            onClick={props.onHide}
          />
        )}
        {isScheduled && (
          <StyledButton
            theme="secondary"
            block={true}
            value="Hide"
            onClick={props.onHide}
          />
        )}
        {(isScheduled || isHidden || isDraft) && (
          <StyledButton
            theme="primary"
            block={true}
            value="Publish"
            onClick={props.onPublish}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Status;
