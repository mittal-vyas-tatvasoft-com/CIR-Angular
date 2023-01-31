import { SelectOption } from '../../form-control/interface/select-option.interface';

export interface TableDataModel<T> {
  tableData: Array<T>;
  tableColumn: Column[];
}

export interface Column {
  columnDef: string;
  header: string;
  isSortable: boolean;
  type: string;
  isFilter?: boolean;
  options?: SelectOption[];
  actions?: string[];
  searchValue?: string;
}

export interface FilterColumns {
  colName: string;
  isFilter: boolean | undefined;
  options: SelectOption[] | undefined;
  value?: boolean | string;
}
