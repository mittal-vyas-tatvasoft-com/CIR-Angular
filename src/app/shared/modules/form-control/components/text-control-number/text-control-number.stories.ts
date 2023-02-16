// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { TextControlNumberComponent } from './text-control-number.component';
import { ValidatorService } from '../../service/validator.service';

const fb = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  defaultFirstName: new FormControl('Shubham'),
  firstNameValidate: new FormControl('', [Validators.required])
});

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Text-Control-Number-Component',
  component: TextControlNumberComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [ValidatorService]
    }),
  ],

  parameters: {
    controls: {
      exclude: ['_validator'],
    },
  },

  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    form: {
      mapping: { Default: fb },
    },
  },
} as Meta<TextControlNumberComponent>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<TextControlNumberComponent> = (
  args: TextControlNumberComponent,
) => ({
  props: args,
});

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Basic.args = {
  formControlModel: {
    label: 'Test',
    key: 'firstName',
    value: '',
    inputType: '',
  },
  form: 'Default' as any,
};

export const PreFilledValue = Template.bind({});
PreFilledValue.args = {
  formControlModel: {
    label: 'Test',
    key: 'defaultFirstName',
    value: '',
    inputType: '',
  },
  form: 'Default' as any,
};

export const Validation = Template.bind({});
Validation.args = {
  formControlModel: {
    label: 'Test',
    key: 'firstNameValidate',
    value: '',
    inputType: '',
    requiredErrMsg: 'This field is required'
  },
  form: 'Default' as any,
};
