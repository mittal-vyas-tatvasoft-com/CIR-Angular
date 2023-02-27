import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserModel, UserViewModel } from '../../interface/user.interface';

import { UserDataFilter } from '../../interface/user-filter.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  staticOptions,
  tableColumnConfig,
  userModel,
} from '../../configs/user.config';
import { MatDialog } from '@angular/material/dialog';
import { message } from 'src/app/shared/messages/messages.static';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { errors } from 'src/app/shared/messages/error.static';
import { Navigation, Permissions } from 'src/app/shared/common/enum';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { UserFacadeService } from '../../services/user-facade.service';
import { RolePermissionService } from 'src/app/shared/services/role-permission/role-permission.service';
import { SelectOption } from 'src/app/shared/modules/form-control/interface/select-option.interface';
import { Column } from 'src/app/shared/modules/tables/interfaces/table-data.interface';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { DownloadService } from 'src/app/shared/services/role-permission/download/download.service';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {
  defaultCurrentPage,
  defaultPageSizeOption,
  defaultSelectOptionRole,
  defaultTotalCount,
} from 'src/app/shared/common/interfaces/constants.static';
export { UserModel as User } from '../../interface/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  // userList = new MatTableDataSource<UserModel>([]);
  userList = new MatTableDataSource<UserModel>();
  users: UserModel[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userDataFilter = {} as UserDataFilter;
  private ngUnsubscribe$ = new Subject<void>();

  roleOptions: SelectOption[] = [];
  pageSizeOption = defaultPageSizeOption;
  itemsPerPage: number = defaultPageSizeOption[0];
  currentPage = defaultCurrentPage;
  totalCount = defaultTotalCount;
  sortColumnName = '';
  search = '';
  isAsc = '';
  roleId: number;
  enabled: boolean | null = null;

  form: FormGroup;
  userModel = userModel;
  searchField = userModel.searchField;

  subscription: Subscription;
  enableOptions: SelectOption[] = staticOptions.enableOptions;
  navigationEnum = Navigation;
  tableColumn: Column[] = [];
  noUserDataFound = errors.user.userNotFound;
  permissions = Permissions;

  constructor(
    private userService: UserService,
    public router: Router,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public snackbarService: SnackbarService,
    public downloadService: DownloadService,
    public userFacadeService: UserFacadeService,
    public rolePermissionService: RolePermissionService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
      roleId: [''],
      enabled: [''],
    });

    this.getTableColumns();
    this.getUserList();
    this.getRoleList();
  }

  getTableColumns() {
    this.tableColumn = this.rolePermissionService.tableColumnsWithPermissions(
      tableColumnConfig.tableColumn,
      Permissions.USER_EDIT,
      Permissions.USER_DELETE,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select(e: any) {
    if (e.sortColumn) {
      this.sortColumnName = e.sortColumn;
      this.isAsc = e.direction;
      this.getUserList();
    } else {
      switch (e.column || e.action || e.sortColumn) {
        case 'roleName': {
          this.onSelectRole(e.id);
          this.updateSelectedOptions(e);
          break;
        }
        case 'enabled': {
          this.onSelectEnabled(e.id);
          this.updateSelectedOptions(e);
          break;
        }
        case 'edit': {
          this.router.navigate([
            `${Navigation.Admin}/${Navigation.User}/${Navigation.Edit}/${e.data.id}`,
          ]);
          break;
        }
        case 'delete': {
          this.openDialog(e.data.id);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  updateSelectedOptions(e: { column: string; id: string }) {
    const ind = this.tableColumn.findIndex((el) => el.columnDef === e.column);
    this.tableColumn[ind].searchValue = e.id;
  }

  getUserList() {
    this.userDataFilter = {
      displayLength: this.itemsPerPage,
      displayStart: this.currentPage,
      searchColumnName: this.search,
      sortColumnName: this.sortColumnName,
      isAsc: this.isAsc,
      roleId: this.roleId,
      enabled: this.enabled,
    };

    if (this.userDataFilter != null || this.userDataFilter != undefined) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.userService
        .getUsers(this.userDataFilter)
        .subscribe({
          next: (res: ResponseModel<UserViewModel>) => {
            if (res.result) {
              this.totalCount = res.data.count;
              this.users = res.data.usersList;
              this.userList = new MatTableDataSource(res.data.usersList);
              this.userList.sort = this.sort;
            } else {
              this.userList = new MatTableDataSource();
            }
          },
          error: (e) => {
            this.snackbarService.error(e.message || errors.common.serverError);
          },
        });
    }
  }

  ngAfterViewInit(): void {
    this.userList.paginator = this.paginator;
  }

  onPageChange(page: { pageIndex: number; pageSize: number }) {
    this.currentPage = page.pageIndex * page.pageSize + 1;
    this.itemsPerPage = page.pageSize;
    this.getUserList();
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: {
        id,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.userService
            .deleteUser(id)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((res: ResponseModel<UserViewModel>) => {
              if (res.result) {
                this.snackbarService.success(message.user.successFullyDeleted);
                this.getUserList();
              } else {
                this.snackbarService.error(res.message);
              }
            });
        }
      },
      error: (e) => {
        this.snackbarService.error(e.message || errors.common.serverError);
      },
    });
  }

  //For Searching
  onSearch(searchTerm: string) {
    this.search = searchTerm;
    this.getUserList();
  }

  getRoleList() {
    this.userFacadeService
      .fetchRoleList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((items) => {
        const data = [...items];
        data.unshift(defaultSelectOptionRole);
        this.roleOptions = data;
        const columnOptions = this.tableColumn.find(
          (x) => x.columnDef === 'roleName',
        )?.options;
        columnOptions?.push(...data);
      });
  }

  onSelectRole(event: number) {
    this.roleId = event;
    this.getUserList();
  }

  onSelectEnabled(event: number) {
    const data = this.enableOptions.filter((d) => d.id === Number(event))[0]
      ?.key;
    if (typeof data == 'boolean') {
      this.enabled = data;
    } else {
      this.enabled = null;
    }
    this.getUserList();
  }

  //Export Data
  exportData() {
    this.downloadService.downloadCSV(
      this.downloadService.convertToCSV(this.users),
      'users.csv',
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
