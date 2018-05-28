// @flow

import * as React from 'react';
import styled from 'styled-components';

import Input from '../Input';
import Select from '../Select';
import Label from '../Label';
import Button from '../Button';

import icons from '../../constants/icons';
import role from '../../constants/role';

const Form = styled.form`
  max-width: 40rem;
  padding: 1rem 1rem 2rem 2rem;
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
  handleSubmit: Function,
  handleChange: Function,
  email: string,
  displayName: string,
  password: string,
  repeatPassword: string,
  role: $Values<typeof role>,
};

const options = [
  {
    value: role.EDITOR,
    label: role.EDITOR,
  },
  {
    value: role.AUTHOR,
    label: role.AUTHOR,
  },
];

const NewTeamMemberForm = (props: Props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Fieldset>
        <StyledLabel for="email">E-mail</StyledLabel>
        <Input
          required
          id="email"
          name="email"
          onChange={props.handleChange}
          placeholder="example@email.com"
          type="email"
          value={props.email}
        />
      </Fieldset>
      <Fieldset>
        <StyledLabel for="name">Display name</StyledLabel>
        <Input
          required
          id="name"
          name="displayName"
          onChange={props.handleChange}
          placeholder="Jane Doe"
          type="text"
          value={props.displayName}
        />
      </Fieldset>
      <Fieldset>
        <StyledLabel for="password">Password</StyledLabel>
        <Input
          required
          id="password"
          name="password"
          onChange={props.handleChange}
          type="password"
          value={props.password}
          placeholder="Enter password"
        />
      </Fieldset>
      <Fieldset>
        <StyledLabel for="repeat-password">Repeat password</StyledLabel>
        <Input
          required
          id="repeat-password"
          name="repeatPassword"
          onChange={props.handleChange}
          type="password"
          value={props.repeatPassword}
          placeholder="Repeat password"
        />
      </Fieldset>
      <Fieldset>
        <StyledLabel for="role">Role</StyledLabel>
        <Select
          required
          id="role"
          name="role"
          value={props.role}
          onChange={props.handleChange}
          options={options}
        />
      </Fieldset>
      <Actions>
        <Button
          theme="primary"
          value="Add new member"
          iconLeft={icons.CHECK}
          type="submit"
        />
      </Actions>
    </Form>
  );
};

export default NewTeamMemberForm;
