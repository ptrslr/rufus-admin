// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import { BrowserRouter } from 'react-router-dom';

import '../index.css';

import icons from '../constants/icons';

import Avatar from '../components/Avatar';
import AvatarBox from '../components/AvatarBox';
import Button from '../components/Button';
import Input from '../components/Input';
import Icon from '../components/Icon';
import Label from '../components/Label';
import Select from '../components/Select';
import Radio from '../components/Radio';
import PageHeader from '../components/PageHeader';
import Loader from '../components/Loader';
import InlineLoader from '../components/InlineLoader';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Avatar', module)
  .add('Extra Small - xs', () => (
    <Avatar size="xs" src="https://picsum.photos/100" alt="John Doe" />
  ))
  .add('Small - sm', () => (
    <Avatar size="sm" src="https://picsum.photos/100" alt="John Doe" />
  ))
  .add('Medium - md', () => (
    <Avatar size="md" src="https://picsum.photos/100" alt="John Doe" />
  ))
  .add('Large - lg', () => (
    <Avatar size="lg" src="https://picsum.photos/100" alt="John Doe" />
  ));

storiesOf('AvatarBox', module).add('Default', () => (
  <AvatarBox title="Author" image="https://picsum.photos/100" name="John Doe" />
));

storiesOf('Button', module)
  .add('default button', () => <Button value="Default button" />)
  .add('primary button', () => (
    <Button theme="primary" value="Primary button" />
  ))
  .add('link-like button', () => (
    <Button theme="link" value="Link-like button" />
  ))
  .add('Button with left icon', () => (
    <Button iconLeft={icons.PLUS} value="Button" />
  ))
  .add('Button with right icon', () => (
    <Button iconRight={icons.PLUS} value="Button" />
  ));

storiesOf('Form components', module)
  .add('Input', () => <Input type="text" placeholder="Test" />)
  .add('Label', () => <Label>Name:</Label>)
  .add('Select', () => (
    <Select
      options={[
        {
          value: 0,
          label: 'Ekonomika',
        },
        {
          value: 1,
          label: 'Sport',
        },
      ]}
    />
  ))
  .add('Radio', () => (
    <div>
      <label>
        <Radio name="radio" />
        foo
      </label>
      <label>
        <Radio name="radio" />
        bar
      </label>
    </div>
  ));

storiesOf('Icon', module).add('All icons', () => (
  <div>
    {Object.keys(icons).map(icon => (
      <div key={icon}>
        <Icon name={icons[icon]} opticalAlign="true" />
        &nbsp;&nbsp;{icon}
      </div>
    ))}
  </div>
));

storiesOf('PageHeader', module).add('with menu and actions', () => {
  const menu = [
    {
      label: 'And now',
      to: '/',
    },
    {
      label: 'Something',
      to: '/something',
    },
    {
      label: 'Completely',
      to: '/completely',
    },
    {
      label: 'Different',
      to: '/different',
    },
  ];
  const actions = [
    <Button theme="link" value="Secondary" iconLeft={icons.ARROW_LEFT} />,
    <Button theme="primary" value="Primary" iconLeft={icons.CHECK} />,
  ];
  return (
    <BrowserRouter>
      <PageHeader title="Page header" menu={menu} actions={actions} />
    </BrowserRouter>
  );
});

storiesOf('Loader', module)
  .add('default', () => <Loader isLoading="true">hello world</Loader>)
  .add('size set to 6rem', () => (
    <Loader isLoading="true" size="6rem">
      hello world
    </Loader>
  ))
  .add('size set to 1.5rem', () => (
    <Loader isLoading="true" size="1.5rem">
      hello world
    </Loader>
  ));

storiesOf('InlineLoader', module)
  .add('default', () => <InlineLoader isLoading="true" />)
  .add('with label', () => <InlineLoader isLoading="true" label="Saving" />)
  .add('size set to 2rem', () => (
    <InlineLoader isLoading="true" size="2rem" label="Saving" />
  ));

storiesOf('Modal', module).add('default', () => (
  <Modal isOpen="true" contentLabel="Hello world" closeModal={action('Close')}>
    Hello World
  </Modal>
));

storiesOf('ConfirmModal', module).add('default', () => (
  <ConfirmModal
    isOpen="true"
    closeModal={action('Close')}
    title="Are you sure?"
    subtitle={<p>Bears, beets, Battlestar Galactica.</p>}
    onConfirm={action('Confirm')}
    onCancel={action('Cancel')}
    confirmValue="Confirm"
  />
));
