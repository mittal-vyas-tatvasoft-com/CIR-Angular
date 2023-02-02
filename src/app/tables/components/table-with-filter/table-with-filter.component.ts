import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/shared/modules/tables/interfaces/table-data.interface';

@Component({
  selector: 'app-table-with-filter',
  templateUrl: './table-with-filter.component.html',
  styleUrls: ['./table-with-filter.component.scss']
})
export class TableWithFilterComponent {

  tableColumn: Column[] = [
    {
      columnDef: 'user',
      header: 'User',
      isSortable: true,
      type: 'string',
      isFilter: true,
      options: [{ id: 1, key: 'Select', value: 'ass' }],
      searchValue: '',
    },
    {
      columnDef: 'firstName',
      header: 'First Name',
      isSortable: true,
      type: 'string',
      isFilter: false,
      searchValue: '',
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
      isSortable: true,
      type: 'string',
      isFilter: false,
      searchValue: '',
    },
    {
      columnDef: 'email',
      header: 'Email',
      isSortable: true,
      type: 'string',
      isFilter: true,
      options: [{ id: 1, key: 'Select', value: 'ass' }],
      searchValue: '',
    },
    {
      columnDef: 'role',
      header: 'Role',
      isSortable: true,
      type: 'string',
      isFilter: false,
      searchValue: '',
    },
    {
      columnDef: 'more_option',
      header: 'Action',
      isSortable: true,
      type: 'string',
      isFilter: false,
      actions: ['edit', 'delete'],
      searchValue: '',
    },
  ]

  userList = new MatTableDataSource<any[]>();
  users: any[] = [
    {
      user: 'User name',
      firstName: 'Test1',
      lastName: 'Last Name2',
      email : 'email',
      role : 'admin'
    },
    {
      user: 'User name',
      firstName: 'Test1',
      lastName: 'Last Name2',
      email : 'email',
      role : 'admin'
    },
    {
      user: 'User name',
      firstName: 'Test1',
      lastName: 'Last Name2',
      email : 'email',
      role : 'admin'
    },
    {
      user: 'User name',
      firstName: 'Test1',
      lastName: 'Last Name2',
      email : 'email',
      role : 'admin'
    },
    {
      user: 'User name',
      firstName: 'Test1',
      lastName: 'Last Name2',
      email : 'email',
      role : 'admin'
    },
  ];
  noUserDataFound = 'No data found';


  //tableColumnData
  tableColumnData = [
    {
      columnDef: 'currency',
      header: 'Currency',
      isSortable: true,
      type: 'string',
      isFilter: true,
      searchValue: '',
    },
    {
      columnDef: 'enabled',
      header: 'Enabled',
      isSortable: true,
      type: 'toggle',
      isFilter: false,
      searchValue: '',
    },
  ];

  currencySelections = [
    {
      currency: 'AED',
      enabled: false,
    },
    {
      currency: 'INR',
      enabled: false,
    },
    {
      currency: 'EUR',
      enabled: true,
    },
    {
      currency: 'POD',
      enabled: false,
    },
    {
      currency: 'AED',
      enabled: true,
    },
  ]

  dropDownColumn = [
    {
      columnDef: 'enabled',
      header: 'Enabled',
      isSortable: true,
      type: 'toggle',
      isFilter: false,
      searchValue: '',
    },
    {
      columnDef: 'dropDown',
      header: 'Dropdown Option',
      isSortable: true,
      type: 'textInput',
      isFilter: true,
      searchValue: '',
    },
    {
      columnDef: 'type',
      header: 'Type',
      isSortable: true,
      type: 'string',
      isFilter: true,
      searchValue: '',
    },
  ]
  dropDownSections = [
    {
      enabled: false,
      dropDown: 'Test134',
      type: 'Refund'
    },
    {
      enabled: true,
      dropDown: 'Test134',
      type: 'Refund'
    },
    {
      enabled: false,
      dropDown: 'Test134',
      type: 'Refund'
    },
    {
      enabled: false,
      dropDown: 'Test134',
      type: 'Refund'
    }
  ]


  // fonts

  fontColumn = [
    {
      columnDef: 'enabled',
      header: 'Enabled',
      isSortable: false,
      type: 'toggle',
      isFilter: false,
      searchValue: '',
    },
    {
      columnDef: 'font',
      header: 'Font',
      isSortable: false,
      type: 'string',
      isFilter: false,
      searchValue: '',
    },
    {
      columnDef: 'default',
      header: 'Default',
      isSortable: false,
      type: 'radio',
      isFilter: false,
      searchValue: '',
    },
  ]
  fontSections = [
    {
      enabled: false,
      font: 'Test134',
      default: false
    },
    {
      enabled: true,
      font: 'Test134',
      default: true
    },
    {
      enabled: false,
      font: 'Test134',
      default: false
    },
    {
      enabled: false,
      font: 'Test134',
      default: false
    }
  ]
}
