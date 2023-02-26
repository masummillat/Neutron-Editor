import type { Meta, StoryObj } from '@storybook/react';
import {NeutronEditor} from '../../components'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Neutron Editor',
  component: NeutronEditor,
  tags: ['autodocs'],
  argTypes: {
    
  },
} satisfies Meta<typeof NeutronEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const NeutronEditorExample: Story = {
  args: {
    placeholder: 'Write you story here...'
  },
};


