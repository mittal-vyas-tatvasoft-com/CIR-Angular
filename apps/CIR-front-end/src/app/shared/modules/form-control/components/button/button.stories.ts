// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SharedMaterialModule } from '../../../../../shared/material/shared-material.module';
import { ButtonComponent } from './button.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Button-Component',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SharedMaterialModule],
    }),
    // componentWrapperDecorator(
    //   (story) =>
    //     `<div class="storybook-ng-content-wrapper storybook-grey">${story}</div>`,
    // ),
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    color: {
      description: "value should be  'primary' | 'accent' | 'warn'",
    },
    btnClick: {},
  },
} as Meta<ButtonComponent>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  label: 'Button',
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  color: 'accent',
  isDisabled: true,
};
