import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { message } from 'src/app/shared/messages/messages.static';
import { SelectionEvent } from 'src/app/shared/modules/tables/interfaces/table-data.interface';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { GlobalConfigurationReasons } from '../../interfaces/reasons.interface';
import { ReasonsService } from '../../services/reasons.service';
import { Type } from 'src/app/shared/common/enum';

@Component({
  selector: 'app-reasons-list',
  templateUrl: './reasons-list.component.html',
  styleUrls: ['./reasons-list.component.scss'],
})
export class ReasonsListComponent implements OnInit {
  @Input() data: GlobalConfigurationReasons[];
  @Output() getDropdownOptionsData: EventEmitter<object> = new EventEmitter();
  private ngUnsubscribe$ = new Subject<void>();
  reasons: GlobalConfigurationReasons[] = [];

  tableColumn = [
    {
      columnDef: 'enabled',
      header: 'Available to Portals',
      isSortable: false,
      type: 'toggle',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'content',
      header: 'Dropdown Option',
      isSortable: false,
      type: 'textInput',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'type',
      header: 'type',
      isSortable: false,
      type: 'String',
      isFilter: false,
      options: [],
    },
  ];
  constructor(
    public reasonsService: ReasonsService,
    public snackbarService: SnackbarService,
  ) {}

  ngOnChanges(): void {
    if (this.data) this.data = [...this.data];
  }

  ngOnInit(): void {
    this.GetReasons();
  }

  // fetches all reasons
  GetReasons() {
    this.reasonsService.getAllGlobalConfigurationReasons().subscribe({
      next: (res: ResponseModel<GlobalConfigurationReasons[]>) => {
        this.reasons = res.data;
      },
      error: (e: Error) => {
        this.snackbarService.error(e.message);
      },
    });
  }

  selectionChanges(event: SelectionEvent<GlobalConfigurationReasons>) {
    const { element } = event;

    switch (event.columnDef) {
      case 'enabled':
        {
          this.data.forEach((item) => {
            if (element.id === item.id) {
              item.enabled = event.data.checked;
            }
          });
        }
        break;

      case 'content':
        {
          this.data.forEach((item) => {
            if (element.id === item.id) {
              item.content = event.data.target.value;
            }
          });
        }
        break;

      default:
        break;
    }
  }

  saveReasons() {
    this.data.forEach((res) => {
      const type = res.type;
      res.type = Number(Type[type as number]);
    });

    if (this.data.length > 0) {
      this.reasonsService
        .updateGlobalConfigurationReasons(this.data)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<string>) => {
            if (res.result) {
              this.snackbarService.success(
                message.dropdownOptions.successFullyUpdated,
              );
              this.GetReasons();
            } else {
              this.snackbarService.error(res.message);
            }
          },
          error: (e) => {
            this.snackbarService.error(e.message);
          },
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
