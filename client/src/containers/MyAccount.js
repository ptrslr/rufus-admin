// @flow
import * as React from 'react';
import styled from 'styled-components';

import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import Button from '../components/Button';
import Label from '../components/Label';
import Input from '../components/Input';

import { firebaseAuth } from '../api';
import icons from '../constants/icons';

const Form = styled.form`
  max-width: 32rem;
  padding: 1rem 0 0 0;
`;
const Fieldset = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const StyledLabel = styled(Label)`
  flex: 0 0 12rem;
  padding-right: 1rem;
`;
const Actions = styled.div`
  margin-top: 1.5rem;
  text-align: right;
`;

type Props = {
  history: Object,
  user: ?Object,
  userRole: ?$Values<typeof role>,
  onUserUpdate: Function,
};
type State = {
  displayName: string,
  email: string,
};
class MyAccount extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      newDisplayName: '',
      email: '',
      newEmail: '',
    };
  }
  componentDidMount = () => {
    this.setState({
      displayName: this.props.user.displayName,
      newDisplayName: this.props.user.displayName,
      email: this.props.user.email,
      newEmail: this.props.user.email,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { displayName, newDisplayName, email, newEmail } = this.state;

    if (newDisplayName !== displayName) {
      firebaseAuth.currentUser
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          console.log('Update displayName successful');
          this.props.onUserUpdate();
        })
        .catch(err => {
          console.log('Update displayName error');
          console.log(err);
        });
    }

    if (newEmail !== email) {
      firebaseAuth.currentUser
        .updateEmail(newEmail)
        .then(() => {
          console.log('Update email successful');
          this.props.onUserUpdate();
        })
        .catch(err => {
          console.log('Update email error');
          console.log(err);
        });
    }
  };

  onEmailChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      newEmail: e.currentTarget.value,
    });
  };
  onDisplayNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      newDisplayName: e.currentTarget.value,
    });
  };

  render() {
    return (
      <Page>
        <PageHeader title="My Account" />

        <PageBody padding="2rem 2rem">
          <Form onSubmit={this.handleSubmit}>
            <Fieldset>
              <StyledLabel for="email">E-mail</StyledLabel>
              <Input
                required
                id="email"
                name="email"
                // onChange={this.onEmailChange}
                placeholder="example@email.com"
                type="email"
                readOnly={true}
                value={this.state.newEmail}
              />
            </Fieldset>
            <Fieldset>
              <StyledLabel for="name">Display name</StyledLabel>
              <Input
                required
                id="name"
                name="displayName"
                onChange={this.onDisplayNameChange}
                placeholder="Jane Doe"
                type="text"
                value={this.state.newDisplayName}
              />
            </Fieldset>

            <Actions>
              <Button
                theme="primary"
                value="Save"
                iconLeft={icons.CHECK}
                type="submit"
              />
            </Actions>
          </Form>

          {/*         <ConfirmModal */}
          {/*           isOpen={this.state.isDisableModalOpen} */}
          {/*           closeModal={this.closeDisableModal} */}
          {/*           title="Are you sure?" */}
          {/*           subtitle={ */}
          {/*             <div> */}
          {/*               Are you sure you want to disable{' '} */}
          {/*               <strong>{currentName ? currentName : ''}</strong> */}
          {/*             </div> */}
          {/*           } */}
          {/*           onConfirm={this.onDisableConfirm} */}
          {/*           onCancel={this.closeDisableModal} */}
          {/*           confirmValue="Disable" */}
          {/*         /> */}
          {/*  */}
          {/*         <ConfirmModal */}
          {/*           isOpen={this.state.isEnableModalOpen} */}
          {/*           closeModal={this.closeEnableModal} */}
          {/*           title="Are you sure?" */}
          {/*           subtitle={ */}
          {/*             <div> */}
          {/*               Are you sure you want to enable{' '} */}
          {/*               <strong>{currentName ? currentName : ''}</strong> */}
          {/*             </div> */}
          {/*           } */}
          {/*           onConfirm={this.onEnableConfirm} */}
          {/*           onCancel={this.closeEnableModal} */}
          {/*           confirmValue="Enable" */}
          {/*         /> */}
        </PageBody>
      </Page>
    );
  }
}

export default MyAccount;
