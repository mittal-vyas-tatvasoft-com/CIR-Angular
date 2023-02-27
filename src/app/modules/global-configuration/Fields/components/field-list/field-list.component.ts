import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { SelectionEvent } from 'src/app/shared/modules/tables/interfaces/table-data.interface';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { GlobalConfigurationFieldsModel } from '../../interfaces/fields.interface';
import { FieldsService } from '../../services/fields.service';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss'],
})
export class FieldsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  dataSource = new MatTableDataSource<GlobalConfigurationFieldsModel>();
  fieldsSelections: GlobalConfigurationFieldsModel[] = [];
  fields: GlobalConfigurationFieldsModel[] = [];
  changedFields: GlobalConfigurationFieldsModel[] = [];
  form: FormGroup;
  tableColumn = [
    {
      columnDef: 'fieldName',
      header: 'Fields',
      isSortable: false,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'enabled',
      header: 'Enabled',
      isSortable: false,
      type: 'toggle',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'required',
      header: 'Required',
      isSortable: false,
      type: 'toggle',
      isFilter: false,
      options: [],
    },
  ];

  constructor(
    private fb: FormBuilder,
    public snackbarService: SnackbarService,
    public fieldsService: FieldsService,
  ) {}

  ngOnInit(): void {
    this.GetAllFields();
  }

  // fetches all fields
  GetAllFields() {
    this.fieldsService.GetAllGlobalConfigurationFields().subscribe({
      next: (res: ResponseModel<GlobalConfigurationFieldsModel[]>) => {
        this.fields = res.data;
      },
      error: (e: Error) => {
        this.snackbarService.error(e.message);
      },
    });
  }

  //on toggle change, pushes changed fields into a list to use it as input on api
  selectionChanges(e: SelectionEvent<GlobalConfigurationFieldsModel>) {
    const { element } = e;

    switch (e.columnDef) {
      case 'enabled':
        {
          element.enabled = e.data.checked;
          this.changedFields.push(element);
        }
        break;

      case 'required':
        {
          element.required = e.data.checked;
          this.changedFields.push(element);
        }
        break;
    }
  }

  // submits/saves fields data
  onSubmit(): void {
    this.fieldsService
      .UpdateGlobalConfigurationFields(this.changedFields)
      .subscribe({
        next: (res: ResponseModel<GlobalConfigurationFieldsModel[]>) => {
          if (res.result) {
            this.snackbarService.success(res.message);
          } else {
            this.snackbarService.error(res.message);
          }
        },
        error: (e: Error) => {
          this.snackbarService.error(e.message);
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
