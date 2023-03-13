import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import {
  defaultCurrentPage,
  defaultPageSizeOption,
  defaultSelectCountryCode,
  defaultSelectCountryName,
  defaultTotalCount,
} from 'src/app/shared/common/interfaces/constants.static';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { CommonFacadeService } from 'src/app/shared/services/common/common-facade.service';
import { DownloadService } from 'src/app/shared/services/role-permission/download/download.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { WeekendDataFilter } from '../../interfaces/weekend.filter.interface';
import {
  GlobalConfigurationWeekendModel,
  WeekendModel,
} from '../../interfaces/weekends.interface';
import {
  dayOptions,
  weekendsControl,
  tableColumnConfig,
} from '../../configs/weekends.config';
import { WeekendsService } from '../../services/weekends.service';
import { Column } from 'src/app/shared/modules/tables/interfaces/table-data.interface';
import { errors } from 'src/app/shared/messages/error.static';
import { SelectOption } from 'd:/CIR/CIR-Angular/src/app/shared/modules/form-control/interface/select-option.interface';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { AddWeekendDialogComponent } from '../add-weekend-dialog/add-weekend-dialog.component';

@Component({
  selector: 'app-weekend-list',
  templateUrl: './weekend-list.component.html',
  styleUrls: ['./weekend-list.component.scss'],
})
export class WeekendListComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: FormGroup;
  weekendDataFilter: WeekendDataFilter;
  weekendList = new MatTableDataSource<WeekendModel>([]);
  weekends: WeekendModel[] = [];
  countryCodeList: SelectOption[] = [];
  countryNameList: SelectOption[] = [];
  searchField = weekendsControl.searchField;
  tableColumn: Column[] = tableColumnConfig.tableColumn;
  currentPage = defaultCurrentPage;
  totalCount = defaultTotalCount;
  pageSizeOption = defaultPageSizeOption;
  itemsPerPage: number = defaultPageSizeOption[0];
  sortColumnName = '';
  search = '';
  isAsc = true;
  days = dayOptions;
  countryCode: number;
  countryName: number;
  noDataFound: string;
  dayId: string;

  constructor(
    public fb: FormBuilder,
    public weekendService: WeekendsService,
    public commonService: CommonFacadeService,
    public downloadService: DownloadService,
    public snackbarService: SnackbarService,
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.commonService
      .fetchCountryList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe();
    this.commonService.countryCodeList$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((items) => {
        if (items.length > 0) {
          const data = [...items];
          data.unshift(defaultSelectCountryCode);
          this.countryCodeList = data;
          const columnOptions = this.tableColumn.find(
            (x) => x.columnDef === 'countryCode',
          )?.options;
          columnOptions?.push(...data);
        }
      });
    this.commonService.countryList$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((items) => {
        if (items.length > 0) {
          const data = [...items];
          data.unshift(defaultSelectCountryName);
          this.countryNameList = data;
          const columnOptions = this.tableColumn.find(
            (x) => x.columnDef === 'countryName',
          )?.options;
          columnOptions?.push(...data);
        }
      });
    this.noDataFound = errors.weekend.weekendNotFound;
  }

  createForm() {
    this.form = this.fb.group({
      search: [''],
      countryField: [''],
      countryCodeField: [''],
    });
    this.getWeekends();
  }

  getWeekends() {
    this.weekendDataFilter = {
      displayLength: this.itemsPerPage,
      displayStart: this.currentPage,
      sortColumnName: this.sortColumnName,
      countryCodeId: this.countryCode,
      countryNameId: this.countryName,
      search: this.search,
      isAsc: this.isAsc,
    };
    this.weekendService
      .getWeekends(this.weekendDataFilter)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<GlobalConfigurationWeekendModel>) => {
          if (res.result) {
            this.totalCount = res.data.count;
            this.weekends = res.data.weekendList;
            for (const ele of this.weekends) {
              ele.dayOfWeek = this.days.find(
                (x) => x.id === ele.dayOfWeekId,
              )?.value;
            }
            this.weekendList = new MatTableDataSource(this.weekends);
            this.weekendList.sort = this.sort;
          } else {
            this.totalCount = defaultTotalCount;
            this.weekendList = new MatTableDataSource();
          }
        },
        error: (e) => {
          this.snackbarService.error(e.message);
        },
      });
  }

  onSearch(event: string) {
    this.search = event;
    this.getWeekends();
  }

  exportData() {
    const arr = this.weekends.map(
      ({ countryName, countryCode, dayOfWeek }) => ({
        countryName,
        countryCode,
        dayOfWeek,
      }),
    );
    this.downloadService.downloadCSV(
      this.downloadService.convertToCSV(arr),
      'Weekends.csv',
    );
  }

  select(event: any) {
    if (event.sortColumn) {
      console.log(event);
      this.sortColumnName = event.sortColumn;
      this.isAsc = event.direction == 'asc' ? true : false;
      this.getWeekends();
    } else {
      switch (event.column || event.action) {
        case 'countryCode': {
          this.onSelectCountryCode(event.id);
          this.updateSelectedOptions(event);
          break;
        }
        case 'countryName': {
          this.onSelectCountryName(event.id);
          this.updateSelectedOptions(event);
          break;
        }
        case 'delete': {
          this.openDeleteDialog(event.data.id);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialogService.openModel(
      DeleteConfirmationDialogComponent,
      {
        data: {
          data: id,
          title: 'Delete Weekend',
          message: 'Are you sure want to delete this weekend?',
          buttonText: { ok: 'Yes', cancel: 'No' },
          showConfirmButton: true,
          customConfirmButtonStyle: true,
          hasBackdrop: true,
          maxWidth: '400px',
          width: '400px',
          showDialogIcon: true,
        },
        message: 'Delete Weekend',
      },
    );
    dialogRef?.afterClosed().subscribe((result) => {
      if (result) {
        this.weekendService
          .deleteWeekend(id)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe({
            next: (res: ResponseModel<GlobalConfigurationWeekendModel>) => {
              if (res.result) {
                this.snackbarService.success(res.message);
                this.getWeekends();
              } else {
                this.snackbarService.error(res.message);
              }
            },
            error: (e) => {
              this.snackbarService.error(e.message);
            },
          });
      }
    });
  }

  updateSelectedOptions(e: { column: string; id: string }) {
    const ind = this.tableColumn.findIndex((el) => el.columnDef === e.column);
    this.tableColumn[ind].searchValue = e.id;
  }

  onSelectCountryName(id: number) {
    this.countryName = id;
    this.getWeekends();
  }

  onSelectCountryCode(id: number) {
    this.countryCode = id;
    this.getWeekends();
  }

  addWeekend() {
    const dialogRef = this.dialogService.openModel(AddWeekendDialogComponent, {
      data: {
        width: '500px',
        maxWidth: '500px',
        showDialogIcon: true,
      },
      message: '',
    });
    dialogRef?.afterClosed().subscribe({
      next: () => {
        this.getWeekends();
      },
      error: (e) => {
        this.snackbarService.error(errors.common.serverError || e.message);
      },
    });
  }

  onPageChange(page: { pageIndex: number; pageSize: number }) {
    this.currentPage = page.pageIndex * page.pageSize;
    this.itemsPerPage = page.pageSize;
    this.getWeekends();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
