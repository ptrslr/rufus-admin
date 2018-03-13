import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from '../components/Button';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('default button', () => <Button>Hello Button</Button>)
	.add('primary button', () => <Button primary>Primary Button</Button>)
  // .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
