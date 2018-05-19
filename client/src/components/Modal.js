// @flow
import * as React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const ReactModalAdapter = ({
  className,
  overlayClassName,
  modalClassName,
  ...props
}) => {
  return (
    <ReactModal
      className={modalClassName}
      overlayClassName={overlayClassName}
      portalClassName={className}
      {...props}
    />
  );
};

const transitionDuration = 500;

const StyledModal = styled(ReactModalAdapter).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Content',
})`
  .Overlay {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.8);

    will-change: opacity;
    opacity: 0;
    transition: opacity ${transitionDuration}ms;

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }
  .Content {
    padding: 3rem;
    min-width: 24rem;
    text-align: center;
    background: #fff;
    outline: none;

    will-change: opacity, transform;
    opacity: 0;
    transform: translate3d(0, -50%, 0);
    transition: transform ${transitionDuration}ms
        cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity ${transitionDuration}ms cubic-bezier(0.645, 0.045, 0.355, 1);

    &.ReactModal__Content--after-open {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    &.ReactModal__Content--before-close {
      transform: translate3d(0, -50%, 0);
      opacity: 0;
    }
  }
`;

type Props = {
  isOpen: boolean,
  children: React.Node,
  closeModal: Function,
  onAfterOpen?: Function,
  contentLabel: string,
};
const Modal = (props: Props) => {
  return (
    <StyledModal
      isOpen={props.isOpen}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.closeModal}
      contentLabel={props.contentLabel}
      closeTimeoutMS={transitionDuration}
    >
      {props.children}
    </StyledModal>
  );
};

export default Modal;

ReactModal.setAppElement('#root');
