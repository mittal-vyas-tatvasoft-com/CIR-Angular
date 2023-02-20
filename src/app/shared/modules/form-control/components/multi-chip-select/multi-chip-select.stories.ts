import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, Story } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ValueLabel } from 'src/app/shared/common/interfaces/label-value.interface';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { FormControlModel } from '../../interface/form-control.interface';
import { MultiChipSelectComponent } from './multi-chip-select.component';

const fb = new FormGroup({
  basic: new FormControl(),
});

const allItems: ValueLabel[] = [
  { value: 1, label: 'Item 1' },
  { value: 2, label: 'Item 2' },
  { value: 3, label: 'Item 3' },
  { value: 4, label: 'Item 4' },
];

export default {
  title: 'Multi-chip-select-Component',
  component: MultiChipSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        SharedMaterialModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
    }),
  ],
  parameters: {
    controls: {
      exclude: [
        'filteredItems',
        'separatorKeysCodes',
        'fieldCtrl',
        'getSelectedItems',
        'isOptionDisabled',
      ],
    },
  },
  argTypes: {
    form: {
      mapping: { Default: fb },
    },
    formControl: {
      mapping: { Default3: fb.get('basic') },
    },
  },
};

const formControlModel: FormControlModel = {
  key: 'basic',
  label: 'Multi Chip Select Field',
  inputType: '',
  value: '',
};

// const filteredItems: Observable<ValueLabel[]> = of(allItems);

const Template: Story<MultiChipSelectComponent> = (
  args: MultiChipSelectComponent,
) => ({
  props: args,
  styles: [
    `
      @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    `,
  ],
  template: `
  <app-multi-chip-select
    [formControlModel]="formControlModel"
    [formControl]="formControl"
    [form]="form"
    [allItems]="allItems"
    ngDefaultControl
  ></app-multi-chip-select>`,
});

export const Basic = Template.bind({});
Basic.args = {
  allItems,
  formControlModel,
  formControl: 'Default3' as any,
  form: 'Default' as any,
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  allItems,
  formControlModel,
  formControl: new FormControl([allItems[0], allItems[2]]),
  form: 'Default' as any,
};
