import React from 'react';
import { Preview } from '@storybook/react';

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const preview: Preview = {
  parameters,
  decorators: [
    (Story) => (
        // Put your global decorators here
        <Story />
    ),
  ],
};

export default preview;
