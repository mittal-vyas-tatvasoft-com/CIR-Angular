// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { TableComponent } from './table.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectComponent } from '../../../form-control/components/select/select.component';
import { MatSort } from '@angular/material/sort';

const fb = new FormGroup({
  selectedCol: new FormControl(),
  firstName_filter: new FormControl(),
  lastName_filter: new FormControl(),
});

// export interface myData {
//   id: number,
//   firstName: string,
//   lastName: string
// }

const staticTableData = [
  { id: 1, firstName: 'Shubham', lastName: 'Padiya', date: '2023-02-08 13:04:49.500' },
  { id: 2, firstName: 'Deep', lastName: 'Patel', date: '2023-02-08 13:04:49.500' },
]

const staticTableColumnData = [
  {
    columnDef: 'id',
    header: 'Id',
    isSortable: false,
    type: 'number',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'firstName',
    header: 'FirstName',
    isSortable: false,
    type: 'string',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'lastName',
    header: 'LastName',
    isSortable: false,
    type: 'string',
    isFilter: false,
    options: [],
  },
];

const sortableTableColumnData = [
  {
    columnDef: 'id',
    header: 'Id',
    isSortable: true,
    type: 'number',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'firstName',
    header: 'FirstName',
    isSortable: true,
    type: 'string',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'lastName',
    header: 'LastName',
    isSortable: false,
    type: 'string',
    isFilter: false,
    options: [],
  },
];

const filterTableColumnData = [
  {
    columnDef: 'id',
    header: 'Id',
    isSortable: true,
    type: 'number',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'firstName',
    header: 'FirstName',
    isSortable: true,
    type: 'string',
    isFilter: true,
    options: [
      { id: 1, key: "key1", value: "deep" },
      { id: 2, key: "key2", value: "test2" },
      { id: 3, key: "key3", value: "test3" },
      { id: 4, key: "key4", value: "test4" }
    ],
  },
  {
    columnDef: 'lastName',
    header: 'LastName',
    isSortable: false,
    type: 'string',
    isFilter: true,
    options: [
      { id: 1, key: "key1", value: "patel" },
      { id: 2, key: "key2", value: "padiya" },
      { id: 3, key: "key3", value: "test3" },
      { id: 4, key: "key4", value: "test4" }
    ],
  },
];

const dateTypeTableColumnData = [
  {
    columnDef: 'id',
    header: 'Id',
    isSortable: true,
    type: 'number',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'firstName',
    header: 'FirstName',
    isSortable: true,
    type: 'string',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'date',
    header: 'Date',
    isSortable: false,
    type: 'date',
    isFilter: false,
    options: [],
  },
];

const actionsTableColumnData = [
  {
    columnDef: 'id',
    header: 'Id',
    isSortable: false,
    type: 'number',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'firstName',
    header: 'FirstName',
    isSortable: false,
    type: 'string',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'lastName',
    header: 'LastName',
    isSortable: false,
    type: 'string',
    isFilter: false,
    options: [],
  },
  {
    columnDef: 'more_option',
    header: 'Actions',
    isSortable: false,
    type: '',
    actions: ['edit', 'delete']
  }
];

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Table-Component',
  component: TableComponent,
  decorators: [
    moduleMetadata({
      declarations: [SelectComponent],
      imports: [
        CommonModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ]
    }),
  ],

  parameters: {
    controls: {
      exclude: ['displayColumns', 'filterColumns', 'createFilterColumns', 'getFilterColumns', 'getDataToDisplay', 'getFormControls', 'getOptions'],
    },
  },

  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    form: {
      mapping: { Default: fb },
    },
    selection: {},
  },
} as Meta<TableComponent<any>>;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<TableComponent<any>> = (
  args: TableComponent<any>,
) => ({
  props: args,
  styles: [
    `
      @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    `,
  ],
});

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Basic.args = {
  tableData: staticTableData,
  tableDataSource: new MatTableDataSource(staticTableData),
  tableColumns: staticTableColumnData,
};

const data = new MatTableDataSource(staticTableData)

export const Sort = Template.bind({});
Sort.args = {
  tableData: staticTableData,
  tableDataSource: data,
  sort: data.sort as MatSort,
  tableColumns: sortableTableColumnData,
};

export const Filter = Template.bind({});
Filter.args = {
  tableData: staticTableData,
  tableDataSource: data,
  tableColumns: filterTableColumnData,
};

export const WithDateColumnData = Template.bind({});
WithDateColumnData.args = {
  tableData: staticTableData,
  tableDataSource: data,
  tableColumns: dateTypeTableColumnData,
};

export const ActionOptions = Template.bind({});
ActionOptions.args = {
  tableData: staticTableData,
  tableDataSource: data,
  tableColumns: actionsTableColumnData,
};

