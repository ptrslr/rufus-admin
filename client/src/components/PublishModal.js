// @flow
import * as React from 'react';
import styled from 'styled-components';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import Modal from '../components/Modal';
import Button from '../components/Button';
import Radio from '../components/Radio';
import { Heading1 } from '../components/Typography';

import { formControl, input } from '../utils/styles';
import { colors } from '../constants/theme.js';

const Title = Heading1.extend``.withComponent('h2');
// const Subtitle = styled.div`
//   margin-top: 1rem;
// `;

const Header = styled.header`
  padding: 0 0 2.5rem;
`;
const Body = styled.div`
  padding: 0 0 2.5rem;
`;
const Option = styled.label`
  display: flex;
  text-align: left;

  & + & {
    margin-top: 1.5rem;
  }
`;
const OptionBody = styled.div`
  flex: 1 1 auto;
  padding-left: 0.5rem;
`;
const Actions = styled.div`
  display: flex;
  justify-content: center;
`;
const Action = styled.div`
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const StyledDatetime = styled(Datetime)`
  input {
    ${formControl};
    ${input};
    margin-top: 1rem;
  }

  .rdtPicker {
    border-radius: 3px;
    border-color: ${colors.grays[5]};
    margin-top: -1px;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .rdtPicker th.rdtNext, .rdtPicker th.rdtPrev {
    line-height: 1;
  }

  .rdtPicker td.rdtActive,
  .rdtPicker td.rdtActive:hover {
    background-color: ${colors.primary};
  }

  .rdtPicker td.rdtToday:before {
    content: none;
    /*border-bottom-color: ${colors.primary};
    bottom: 2px;
    right: 2px;*/
  }
`;

type Props = {
  isOpen: boolean,
  publishType: string,
  datetimeValue: number,
  onDatetimeChange: Function,
  isDatetimeValid: Function,
  closeModal: Function,
  onPublish: Function,
  onSchedule: Function,
  onCancel: Function,
  onRadioChange: Function,
};
const PublishModal = (props: Props) => {
  const {
    isOpen,
    publishType,
    datetimeValue,
    onDatetimeChange,
    isDatetimeValid,
    closeModal,
    onPublish,
    onSchedule,
    onCancel,
    onRadioChange,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      contentLabel="Publish this post?"
    >
      <Header>
        <Title>Publish this post?</Title>
      </Header>

      <Body>
        <Option>
          <Radio
            name="test"
            value="publish"
            onChange={onRadioChange}
            checked={publishType === 'publish'}
          />
          <OptionBody>Publish now</OptionBody>
        </Option>
        <Option>
          <Radio
            name="test"
            value="schedule"
            onChange={onRadioChange}
            checked={publishType === 'schedule'}
          />
          <OptionBody>
            Schedule for later
            <StyledDatetime
              inputProps={{ disabled: publishType !== 'schedule' }}
              value={datetimeValue}
              onChange={onDatetimeChange}
              isValidDate={isDatetimeValid}
            />
          </OptionBody>
        </Option>
      </Body>

      <Actions>
        <Action>
          <Button theme="secondary" onClick={onCancel} value="Cancel" />
        </Action>
        {publishType === 'publish' ? (
          <Action>
            <Button theme="primary" onClick={onPublish} value="Publish" />
          </Action>
        ) : (
          <Action>
            <Button theme="primary" onClick={onSchedule} value="Schedule" />
          </Action>
        )}
      </Actions>
    </Modal>
  );
};

export default PublishModal;
