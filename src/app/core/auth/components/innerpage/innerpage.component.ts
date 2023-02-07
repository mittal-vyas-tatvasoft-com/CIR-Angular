import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/shared/modules/tables/interfaces/table-data.interface';

@Component({
  selector: 'app-innerpage',
  templateUrl: './innerpage.component.html',
  styleUrls: ['./innerpage.component.scss']
})
export class InnerpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
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
}
