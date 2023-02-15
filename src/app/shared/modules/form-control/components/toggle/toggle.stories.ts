import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { ToggleComponent } from './toggle.component';

const fb = new FormGroup({
  allPermissions: new FormControl(''),
  haveAllPermissions: new FormControl(true),
});

export default {
  title: 'Toggle-Component',
  component: ToggleComponent,
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
} as Meta<ToggleComponent>;

const Template: Story<ToggleComponent> = (args: ToggleComponent) => ({
  props: args,
});

export const allPermissions = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
allPermissions.args = {
  formControlModel: {
    value: '',
    key: 'allPermissions',
    label: 'All permissions',
    inputType: 'boolean',
  },
  form: 'Default' as any,
};

export const haveAllPermissions = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
haveAllPermissions.args = {
  formControlModel: {
    value: '',
    key: 'haveAllPermissions',
    label: 'Have All permissions',
    inputType: 'boolean',
  },
  form: 'Default' as any,
};
