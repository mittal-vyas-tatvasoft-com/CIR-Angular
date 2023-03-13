import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedMaterialModule } from '../../../../../shared/material/shared-material.module';
import { TextControlComponent } from './text-control.component';

const fb = new FormGroup({
  textWithoutValidation: new FormControl(''),
  textWithValidation: new FormControl('', [Validators.required]),
});

export default {
  title: 'Text-Control-Component',
  component: TextControlComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        SharedMaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
    }),
  ],
  argTypes: {
    form: {
      mapping: { Default: fb },
    },
  },
} as Meta<TextControlComponent>;

const Template: Story<TextControlComponent> = (args: TextControlComponent) => ({
  props: args,
});

export const textWithoutValidation = Template.bind({});
textWithoutValidation.args = {
  formControlModel: {
    value: '',
    key: 'textWithoutValidation',
    label: 'text',
    inputType: 'text',
  },
  form: 'Default' as any,
};

export const textWithValidation = Template.bind({});
textWithValidation.args = {
  formControlModel: {
    value: '',
    key: 'textWithValidation',
    label: 'text',
    inputType: 'text',
    requiredErrMsg: 'This Field is Required',
  },
  form: 'Default' as any,
};
