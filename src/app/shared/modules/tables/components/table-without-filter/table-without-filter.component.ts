import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { errors } from 'src/app/shared/messages/error.static';
import { Column } from 'src/app/shared/modules/tables/interfaces/table-data.interface';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-table-without-filter',
  templateUrl: './table-without-filter.component.html',
  styleUrls: ['./table-without-filter.component.scss'],
})
export class TableWithoutFilterComponent<T> implements OnInit, OnChanges {
  @Input() tableColumns: Column[];
  @Input() tableData: any;
  @Output() selection = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort | undefined;
  tableDataSource = new MatTableDataSource<T>();
  displayColumns: string[] = [];
  fileName = '';
  acceptType = ['.otf', '.ttf', '.woff'];

  constructor(public snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.displayColumns = this.tableColumns.map((column) => column.columnDef);
  }

  ngOnChanges(): void {
    if (this.tableData)
      this.tableDataSource = new MatTableDataSource(this.tableData);

    if (this.sort) this.tableDataSource.sort = this.sort;
  }

  getUniqueName(name: string, index: number) {
    return `${name}_${index}`;
  }

  isControl(columnData: Column) {
    return (
      columnData.type == 'toggle' ||
      columnData.type == 'radio' ||
      columnData.type == 'textInput' ||
      columnData.type == 'fileUpload'
    );
  }

  getDataToDisplay(
    columnDef: string,
    element: Record<string, object>,
  ): object | '' {
    return element[columnDef] ? element[columnDef] : '';
  }

  selections(event: Event, element: Element, columnDef: string) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const name = target.files[0].name;
      const extensionWithName = name.split('.');
      if (this.acceptType.includes(`.${extensionWithName[1]}`)) {
        const emitData = {
          data: event,
          element: element,
          columnDef: columnDef,
        };
        this.selection.emit(emitData);
      } else {
        this.snackbarService.error(errors.fonts.wrongFile);
      }
    }
  }
}
