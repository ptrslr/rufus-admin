// @flow
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import Input from '../components/Input';
import ArticleEditor from '../components/ArticleEditor';

import Icon from '../components/Icon';
import ICONS from '../constants/icons';

import Avatar from '../components/Avatar';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('default button', () => <Button value="Default button" />)
  .add('primary button', () => (
    <Button theme="primary" value="Primary button" />
  ))
  .add('Button with icon on left', () => (
    <Button iconLeft={ICONS.people} value="Button" />
  ))
  .add('Button with icon on right', () => (
    <Button iconRight={ICONS.people} value="Button" />
  ));
// .add('link button', () => <Button to="home" value="Link Button" />);

storiesOf('Input', module).add('default input', () => (
  <Input type="text" placeholder="Test" />
));

storiesOf('Icons', module).add('people', () => <Icon name={ICONS.people} />);

storiesOf('Avatars', module)
  .add('Small - sm', () => (
    <Avatar size="sm" src="https://picsum.photos/100" alt="John Doe" />
  ))
  .add('Medium - md', () => (
    <Avatar size="md" src="https://picsum.photos/100" alt="John Doe" />
  ))
  .add('Large - lg', () => (
    <Avatar size="lg" src="https://picsum.photos/100" alt="John Doe" />
  ));

storiesOf('ArticleEditor', module).add('default', () => <ArticleEditor />);
