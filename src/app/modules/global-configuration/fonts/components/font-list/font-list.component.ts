import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { SelectionEvent } from 'src/app/shared/modules/tables/interfaces/table-data.interface';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { GlobalConfigurationFonts } from '../../interfaces/fonts.interface';
import { FontsService } from '../../services/fonts.service';

@Component({
  selector: 'app-font-list',
  templateUrl: './font-list.component.html',
  styleUrls: ['./font-list.component.scss'],
})
export class FontListComponent implements OnInit, OnDestroy {
  @Input() data: GlobalConfigurationFonts[];
  @Output() getFontsData: EventEmitter<object> = new EventEmitter();

  private ngUnsubscribe$ = new Subject<void>();

  //column list
  tableColumn = [
    {
      columnDef: 'enabled',
      header: 'Available To Portals',
      isSortable: false,
      type: 'toggle',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'fontFamily',
      header: 'Font',
      isSortable: false,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'fontFileName',
      header: 'File Name',
      isSortable: false,
      type: 'fileUpload',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'isDefault',
      header: 'Default',
      isSortable: false,
      type: 'radio',
      isFilter: true,
      options: [],
    },
  ];

  constructor(
    private fontsService: FontsService,
    public snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getFonts();
  }

  //get all font list
  getFonts() {
    this.getFontsData.emit();
  }

  //update font
  selectionChanges(event: SelectionEvent<GlobalConfigurationFonts>) {
    const { element } = event;

    switch (event.columnDef) {
      case 'isDefault':
        {
          this.data.forEach((item) => {
            if (element.id === item.id) {
              item.isDefault = true;
            } else {
              item.isDefault = false;
            }
          });
        }
        break;

      case 'enabled':
        {
          this.data.some((item) => {
            if (element.id === item.id) {
              item.enabled = event.data.checked;
              return true;
            }
            return false;
          });
        }
        break;

      case 'fontFileName':
        {
          this.data.some((item) => {
            console.count('some');
            if (element.id === item.id) {
              item.fontFileName = event.data.target.files[0].name;
              console.log(event.data.target.files[0]);
              return true;
            }
            return false;
          });
        }
        break;

      default:
        break;
    }
  }

  //save updated fonts
  onSubmit() {
    this.fontsService
      .updateFonts(this.data)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<GlobalConfigurationFonts[]>) => {
          if (res.result) {
            this.getFonts();
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

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
