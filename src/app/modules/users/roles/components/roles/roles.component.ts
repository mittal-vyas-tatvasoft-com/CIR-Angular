import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  defaultCurrentPage,
  defaultPageSizeOption,
  defaultTotalCount,
} from 'src/app/shared/common/interfaces/constants.static';
import { Roles, RolesModel } from '../../interfaces/roles.interface';
import { roleControl, tableColumnConfig } from '../../configs/role.config';
import { Navigation, Permissions } from 'src/app/shared/common/enum';
import { Column } from 'src/app/shared/modules/tables/interfaces/table-data.interface';
import { errors } from 'src/app/shared/messages/error.static';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { RolePermissionService } from 'src/app/shared/services/role-permission/role-permission.service';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { message } from 'src/app/shared/messages/messages.static';
import { SortObj } from '../../interfaces/role-section.interface';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/modules/form-control/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { DialogData } from 'src/app/shared/common/interfaces/dialogdata.interface';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  pageSizeOption = defaultPageSizeOption;
  itemsPerPage: number = defaultPageSizeOption[0];
  currentPage = defaultCurrentPage;
  totalCount = defaultTotalCount;
  sortObj = {
    active: 'Name',
    direction: 'asc',
  };

  dataSource = new MatTableDataSource<Roles>([]);
  unSubscribe: Subscription;
  noData: string;
  deleteDialog: DialogData;
  form: FormGroup;
  searchField = roleControl.searchField;
  search = '';
  permissions = Permissions;
  tableColumn: Column[] = tableColumnConfig.tableColumn;
  noRoleDataFound = errors.role.roleNotFound;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private roleService: RoleService,
    public router: Router,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public snackbarService: SnackbarService,
    public rolePermissionService: RolePermissionService,
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [''],
    });
    this.getTableColumns();
    this.getData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getTableColumns() {
    this.tableColumn = this.rolePermissionService.tableColumnsWithPermissions(
      tableColumnConfig.tableColumn,
      Permissions.ROLES_EDIT,
      Permissions.ROLES_DELETE,
    );
  }

  onPageChange(page: { pageIndex: number; pageSize: number }) {
    this.currentPage = page.pageIndex + 1;
    this.itemsPerPage = page.pageSize;
    this.getData();
  }
  getData() {
    if (this.unSubscribe) {
      this.unSubscribe.unsubscribe();
    }

    this.unSubscribe = this.roleService
      .list(this.itemsPerPage, this.currentPage, this.sortObj, this.search)
      .subscribe({
        next: (res: ResponseModel<RolesModel>) => {
          if (res.result && res.data.count > 0) {
            this.dataSource = new MatTableDataSource(res.data.rolesList);
            this.totalCount = res.data.count;
          } else {
            this.dataSource = new MatTableDataSource();
          }
        },
        error: (e) => {
          this.snackbarService.error(e.message || errors.common.serverError);
        },
      });
  }

  sortData(event: SortObj) {
    this.currentPage = 1;
    this.sortObj = event;
    this.paginator.pageIndex = 0;
    this.getData();
  }
  onSearch(search: string) {
    this.search = search;
    this.getData();
  }
  addNewRole() {
    this.router.navigate([
      `${Navigation.Admin}/${Navigation.Role}/${Navigation.Add}`,
    ]);
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
          this.roleService
            .delete(id)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((res: ResponseModel<RolesModel>) => {
              //TODO: need to write statusCode for if not have permission to delete
              if (res.result && res.statusCode === 200) {
                this.snackbarService.success(message.role.successFullyDeleted);
                this.getData();
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

  // openDialogs(id: number) {
  //   const dialogRef = this.dialogService.openModel(
  //     DeleteConfirmationDialogComponent,
  //     {
  //       data: {
  //         width: '250px',
  //         title: 'Delete Role',
  //         message: 'Are you sure want to delete this record?',
  //         buttonText: { ok: 'Yes', cancel: 'No' },
  //         data: id,
  //         showConfirmButton: true,
  //         customConfirmButtonStyle: true,
  //         hasBackdrop: true,
  //         maxWidth: '250px',
  //         showDialogIcon: true,
  //       },
  //     },
  //   );

  //   dialogRef?.afterClosed().subscribe({
  //     next: (result) => {
  //       if (result) {
  //         this.roleService
  //           .delete(id)
  //           .pipe(takeUntil(this.ngUnsubscribe$))
  //           .subscribe((res: ResponseModel<RolesModel>) => {
  //             if (res.result && res.statusCode === 200) {
  //               this.snackbarService.success(message.role.successFullyDeleted);
  //               this.getData();
  //             } else {
  //               this.snackbarService.error(res.message);
  //             }
  //           });
  //       }
  //     },
  //     error: (e) => {
  //       this.snackbarService.error(e.message || errors.common.serverError);
  //     },
  //   });
  // }

  select(e: any) {
    if (e.sortColumn) {
      const sortModel = {
        active: e.sortColumn,
        direction: e.direction,
      };
      this.sortData(sortModel);
    } else {
      switch (e.column || e.action) {
        case 'edit': {
          this.router.navigate([
            `${Navigation.Admin}/${Navigation.Role}/${Navigation.Edit}/${e.data.id}`,
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

  ngOnDestroy() {
    if (this.unSubscribe) {
      this.unSubscribe.unsubscribe();
    }
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
