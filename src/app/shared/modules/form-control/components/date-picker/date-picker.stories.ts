import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { DatePickerComponent } from './date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const fb = new FormGroup({
  date: new FormControl(''),
  preDate: new FormControl(new Date()),
});

export default {
  title: 'Date-Picker-Component',
  component: DatePickerComponent,
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
    inputChange: {},
  },
} as Meta<DatePickerComponent>;

const Template: Story<DatePickerComponent> = (args: DatePickerComponent) => ({
  props: args,
});

export const DatePicker = Template.bind({});
DatePicker.args = {
  formControlModel: {
    value: 'DOB',
    key: 'date',
    label: 'Date Of Birth',
    inputType: 'text',
  },
  form: 'Default' as any,
};

export const PreSelectedDatePicker = Template.bind({});
PreSelectedDatePicker.args = {
  formControlModel: {
    value: 'Selected Date',
    key: 'preDate',
    label: 'Selected Date',
    inputType: 'text',
  },
  form: 'Default' as any,
};
