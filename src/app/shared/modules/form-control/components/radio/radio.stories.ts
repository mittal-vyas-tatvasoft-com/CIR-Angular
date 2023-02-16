import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { RadioComponent } from './radio.component';

const fb = new FormGroup({
  radio: new FormControl(''),
  selectedRadio: new FormControl('male'),
});

const options = [
  {
    key: 'Female',
    value: 'female',
  },
  { key: 'Male', value: 'male' },
  { key: 'Other', value: 'other' },
];

export default {
  title: 'Radio-Component',
  component: RadioComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SharedMaterialModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    form: {
      mapping: { Default: fb },
    },
  },
} as Meta<RadioComponent>;

const Template: Story<RadioComponent> = (args: RadioComponent) => ({
  props: args,
});

export const Radio = Template.bind({});
Radio.args = {
  formControlModel: {
    value: '',
    key: 'radio',
    label: 'Gender',
    inputType: 'radio',
  },
  form: 'Default' as any,
  options: options,
};

export const PreSelectedRadio = Template.bind({});
PreSelectedRadio.args = {
  formControlModel: {
    value: '',
    key: 'selectedRadio',
    label: 'Gender',
    inputType: 'radio',
  },
  form: 'Default' as any,
  options: options,
};
