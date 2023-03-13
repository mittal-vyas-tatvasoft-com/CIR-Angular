// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { SharedMaterialModule } from '../../../../../shared/material/shared-material.module';
import { TimePickerComponent } from './time-picker.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export

const fb = new FormGroup({
  time: new FormControl('', [Validators.required]),
  defaultTime: new FormControl(Date.now()),
});

export default {
  title: 'Time-Picker-Component',
  component: TimePickerComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [
        CommonModule,
        SharedMaterialModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxMatTimepickerModule,
        MatIconModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],

  argTypes: {
    form: {
      mapping: { Default: fb },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta<TimePickerComponent>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<TimePickerComponent> = (args: TimePickerComponent) => ({
  props: args,
  styles: [
    `
      @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    `,
  ],
});

export const Basic = Template.bind({});
Basic.args = {
  form: 'Default' as any,
  timePickerModel: {
    value: 'string',
    key: 'defaultTime',
    label: 'Time Picker',
    inputType: 'time',
    required: false,
    setNowButton: true,
    format: 24,
  },
  formControlItem: new FormControl(''),
};

export const SetTime = Template.bind({});
SetTime.args = {
  form: 'Default' as any,
  timePickerModel: {
    value: 'string',
    key: 'defaultTime',
    label: 'Time Picker',
    inputType: 'time',
    required: true,
    setNowButton: true,
    format: 24,
  },
  formControlItem: new FormControl('6:00'),
};

export const Validation = Template.bind({});
Validation.args = {
  form: 'Default' as any,
  timePickerModel: {
    value: 'string',
    key: 'time',
    label: 'Time Picker',
    inputType: 'time',
    required: true,
    setNowButton: true,
    format: 24,
  },
  formControlItem: new FormControl(''),
};
