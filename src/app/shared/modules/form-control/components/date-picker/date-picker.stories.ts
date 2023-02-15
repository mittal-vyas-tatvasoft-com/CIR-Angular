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
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
DatePicker.args = {
  formControlModel: {
    value: 'date',
    key: 'date',
    label: 'date',
    inputType: 'text',
  },
  form: 'Default' as any,
};

export const PreSelectedDatePicker = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
PreSelectedDatePicker.args = {
  formControlModel: {
    value: 'date',
    key: 'preDate',
    label: 'date',
    inputType: 'text',
  },
  form: 'Default' as any,
};
