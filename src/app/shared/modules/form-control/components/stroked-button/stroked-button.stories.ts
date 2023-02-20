// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { StrokedButtonComponent } from './stroked-button.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Stroked-Button-Component',
  component: StrokedButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SharedMaterialModule],
    }),
  ],
  argTypes: {
    color: {
      description: "value should be  'primary' | 'accent' | 'warn'",
    },
  },
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta<StrokedButtonComponent>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<StrokedButtonComponent> = (
  args: StrokedButtonComponent,
) => ({
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  color: 'primary',
  type: 'button',
  isDisabled: false,
  label: 'stroked-button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: 'primary',
  type: 'button',
  isDisabled: true,
  label: 'stroked-button',
};
