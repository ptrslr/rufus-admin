// @flow
import * as React from 'react';
import styled from 'styled-components';

import Modal from '../components/Modal';
import Button from '../components/Button';
import { Heading1 } from '../components/Typography';

const Title = Heading1.extend``.withComponent('h2');
const Subtitle = styled.div`
  margin-top: 1rem;

  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

const Header = styled.header`
  padding: 0 0 2.5rem;
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

type Props = {
  isOpen: boolean,
  closeModal: Function,
  onConfirm: Function,
  onCancel: Function,
  confirmValue?: string,
  cancelValue?: string,
  title: string,
  subtitle?: React.Node,
};
const ConfirmModal = (props: Props) => {
  const {
    isOpen,
    closeModal,
    onConfirm,
    onCancel,
    confirmValue = 'OK',
    cancelValue = 'Cancel',
    title,
    subtitle,
  } = props;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} contentLabel={title}>
      <Header>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Header>

      <Actions>
        <Action>
          <Button theme="secondary" onClick={onCancel} value={cancelValue} />
        </Action>
        <Action>
          <Button theme="primary" onClick={onConfirm} value={confirmValue} />
        </Action>
      </Actions>
    </Modal>
  );
};

export default ConfirmModal;
