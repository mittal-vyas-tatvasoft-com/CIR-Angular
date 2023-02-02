import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { defaultDateFormat } from 'src/app/shared/common/interfaces/constanst.static';
import { FormControlModel } from '../../../form-control/interface/form-control.interface';
import { SelectOption } from '../../../form-control/interface/select-option.interface';
import { Column, FilterColumns } from '../../interfaces/table-data.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnChanges {
  @Input() tableData: T[];
  @Input() tableColumns: Column[];
  @Input() dateFormat = defaultDateFormat;
  @Input() noDataFoundMessage: string;
  @Output() selection = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort | undefined;
  tableDataSource = new MatTableDataSource<T>();
  displayColumns: string[] = [];
  filterColumns: FilterColumns[] = [];
  form: FormGroup;
  isShowFilerSection = true;

  constructor(public fb: FormBuilder) {}

  ngOnChanges(): void {
    this.displayColumns = this.tableColumns.map((column) => column.columnDef);
    this.createFilterColumns();
    if (!this.tableData) return;
    this.tableDataSource = new MatTableDataSource(this.tableData);
    if (this.sort) this.tableDataSource.sort = this.sort;
  }

  private createFilterColumns(): void {
    this.filterColumns = [];
    this.tableColumns.forEach((element) => {
      this.filterColumns.push({
        colName: element.columnDef + '_filter',
        isFilter: element.isFilter,
        options: element.options,
        value: element.searchValue,
      });
    });
    const index = this.filterColumns.findIndex((e) => e.isFilter === true);
    if (index < 0) {
      this.isShowFilerSection = false;
    }
    this.createForm();
  }

  getOptions(col: string): SelectOption[] | undefined {
    const column = this.filterColumns.find((column) => column.colName === col);
    return column?.options;
  }

  getFilterColumns(): string[] {
    return this.filterColumns.map((col) => col.colName);
  }

  getFormControls(col: FilterColumns): FormControlModel {
    return {
      key: col.colName,
      value: col.value || '',
      label: col.colName.split('_')[0],
      inputType: 'text',
    };
  }

  createForm(): void {
    this.form = this.fb.group({});
    this.filterColumns.forEach((ele) => {
      if (!ele) return;
      this.form.addControl(ele.colName, new FormControl());
      this.form.get(ele.colName)?.setValue(ele.value);
    });
  }

  getDataToDisplay(
    columnDef: string,
    element: Record<string, object>,
  ): object | '' {
    return element[columnDef] ? element[columnDef] : '';
  }
}
