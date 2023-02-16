// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { SelectComponent } from './select.component';
import { ValidatorService } from '../../service/validator.service';

const fb = new FormGroup({
  id: new FormControl(),
  defaulSelectedId: new FormControl(2),
  SelectValidate: new FormControl(null, [Validators.required])
});

const staticOptions = [
  { id: 0, value: 'Default', key: '' },
  { id: 1, value: 'value1', key: 'key1' },
  { id: 2, value: 'value2', key: 'key2' }
]

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Select-Component',
  component: SelectComponent,
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
      exclude: ['_validator', 'getOptions'],
    },
  },

  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    form: {
      mapping: { Default: fb },
    },
    selection: {},
  },
} as Meta<SelectComponent>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<SelectComponent> = (
  args: SelectComponent,
) => ({
  props: args,
});

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Basic.args = {
  formControlModel: {
    label: 'Select Option',
    key: 'id',
    value: '',
    inputType: '',
  },
  form: 'Default' as any,
  options: staticOptions
};

export const DefaultSelected = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
DefaultSelected.args = {
  formControlModel: {
    label: 'Select Option',
    key: 'defaulSelectedId',
    value: '',
    inputType: '',
  },
  form: 'Default' as any,
  options: staticOptions
};

export const Validation = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Validation.args = {
  formControlModel: {
    label: 'Select Option',
    key: 'SelectValidate',
    value: '',
    inputType: '',
    requiredErrMsg: 'Please select an option'
  },
  form: 'Default' as any,
  options: staticOptions
};

