// Also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SharedMaterialModule } from '../../../../../shared/material/shared-material.module';
import { CheckboxComponent } from './checkbox.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const fb = new FormGroup({
  basic: new FormControl(''),
  checked: new FormControl(true),
});

export default {
  title: 'CheckBox-Component',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SharedMaterialModule, ReactiveFormsModule],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['_validator'],
    },
  },
  argTypes: {
    form: {
      mapping: { Default: fb },
    },
  },
} as Meta<CheckboxComponent>;

const Template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  component: CheckboxComponent,
  props: args,
});

export const Basic = Template.bind({});
Basic.args = {
  formControlModel: {
    key: 'basic',
    label: 'Checkbox',
    inputType: 'checkbox',
    value: 'test',
  },
  // form: new FormGroup({}),
  form: 'Default' as any,
};

export const Checked = Template.bind({});
Checked.args = {
  formControlModel: {
    key: 'checked',
    label: 'Checkbox',
    inputType: 'checkbox',
    value: 'test',
  },
  form: 'Default' as any,
};
