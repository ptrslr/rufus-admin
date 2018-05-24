/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

function loadStories() {
  require('../src/stories');
}

// addon-info
setDefaults({
  inline: true,
});

configure(loadStories, module);
