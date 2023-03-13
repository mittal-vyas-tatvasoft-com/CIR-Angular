import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ResponseModel } from '../../../../../shared/common/interfaces/response.interface';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';
import { GlobalConfigurationFonts } from '../../interfaces/fonts.interface';
import { FontsService } from '../../services/fonts.service';

@Component({
  selector: 'app-fonts',
  templateUrl: './fonts.component.html',
  styleUrls: ['./fonts.component.scss'],
})
export class FontsComponent implements OnDestroy {
  data: GlobalConfigurationFonts[];
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fontsService: FontsService,
    public snackbarService: SnackbarService,
  ) {}

  //get font list
  getFontsData() {
    this.fontsService
      .getFontList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<GlobalConfigurationFonts[]>) => {
          if (res.result) {
            this.data = res.data;
          } else {
            this.data = [];
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
