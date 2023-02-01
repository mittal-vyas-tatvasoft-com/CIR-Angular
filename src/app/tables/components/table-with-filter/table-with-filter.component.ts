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
      actions: ['edit', 'delete'],
      searchValue: '',
    }
  ]

  userList = new MatTableDataSource<any[]>();
  users: any[] = [];
  noUserDataFound = 'No data found';

}
