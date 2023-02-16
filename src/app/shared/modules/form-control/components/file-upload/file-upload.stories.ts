// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { FileUploadComponent } from './file-upload.component';
import { ValidatorService } from '../../service/validator.service';
import { ButtonComponent } from '../button/button.component';

const fb = new FormGroup({
  file: new FormControl()
});

const validationFB = new FormGroup({
  SelectValidate: new FormControl(null, [Validators.required])
})

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'File-Upload-Component',
  component: FileUploadComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
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
      exclude: ['_validator', 'getType'],
    },
  },

  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    form: {
      mapping: { Default: fb, validateDefault: validationFB },
    },
  },
} as Meta<FileUploadComponent>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<FileUploadComponent> = (
  args: FileUploadComponent,
) => ({
  props: args,
});

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Basic.args = {
  formControlModel: {
    label: 'Test',
    key: 'file',
    value: '',
    inputType: 'file',
  },
  form: 'Default' as any,
};

export const Validation = Template.bind({});
Validation.args = {
  formControlModel: {
    label: 'Select File',
    key: 'SelectValidate',
    value: '',
    inputType: 'file',
    requiredErrMsg: 'Please upload a file'
  },
  form: 'validateDefault' as any,
};
