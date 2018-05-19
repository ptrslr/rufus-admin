// @flow
import * as React from 'react';

import NewTeamMemberForm from '../components/NewTeamMemberForm';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import PageBody from '../components/PageBody';
import Button from '../components/Button';

import icons from '../constants/icons';
import role from '../constants/role';

import { createTeamMember } from '../api';

type Props = {};
type State = {
  isLoading: boolean,
  email: string,
  displayName: string,
  password: string,
  repeatPassword: string,
  role: $Keys<typeof role>,
};
type FormComponent = SyntheticEvent<HTMLInputElement> &
  SyntheticEvent<HTMLSelectElement>;

class NewTeamMember extends React.Component<Props, State> {
  ui: Object;

  constructor() {
    super();

    this.state = {
      isLoading: true,
      email: '',
      displayName: '',
      password: '',
      repeatPassword: '',
      role: role.AUTHOR,
    };
  }

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  handleSubmit = async (e: SyntheticEvent<>) => {
    this.setState({
      isLoading: true,
    });

    e.preventDefault();

    // if (this.state.password === this.state.repeatPassword) {
    //   console.log('submit');
    // }
    await createTeamMember(
      this.state.email,
      this.state.password,
      this.state.displayName,
      this.state.role
    );

    this.props.history.push('/team');
  };

  handleChange = (e: FormComponent) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  render() {
    const actions = [
      <Button
        theme="primary"
        value="Cancel"
        to="/team"
        iconLeft={icons.CLOSE}
      />,
    ];

    return (
      <Page>
        <PageHeader title="New Team Member" actions={actions} />

        <PageBody padding="2rem 0">
          <NewTeamMemberForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            email={this.state.email}
            displayName={this.state.displayName}
            password={this.state.password}
            repeatPassword={this.state.repeatPassword}
            role={this.state.role}
          />
        </PageBody>
      </Page>
    );
  }
}

export default NewTeamMember;
