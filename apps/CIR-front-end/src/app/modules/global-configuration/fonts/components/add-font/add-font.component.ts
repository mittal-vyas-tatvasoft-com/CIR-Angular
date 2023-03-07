import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResponseModel } from '../../../../../shared/common/interfaces/response.interface';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';
import { FontControl } from '../../configs/font.config';
import { GlobalConfigurationFonts } from '../../interfaces/fonts.interface';
import { FontsService } from '../../services/fonts.service';

@Component({
  selector: 'app-add-font',
  templateUrl: './add-font.component.html',
  styleUrls: ['./add-font.component.scss'],
})
export class AddFontComponent implements OnInit, OnDestroy {
  form: FormGroup;
  fontControl = FontControl;
  @Output() getFontsData: EventEmitter<object> = new EventEmitter();
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private fontsService: FontsService,
    public snackbarService: SnackbarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  //create an empty form
  createForm() {
    this.form = this.fb.group({
      nameField: ['', [Validators.required]],
      fontFamilyField: ['', [Validators.required]],
      fileUploadField: [''],
      enabledField: [true],
      fileSource: [''],
    });
  }

  //get uploaded file
  file(event: File | string) {
    this.form.patchValue({
      fileSource: event,
    });
  }

  //add new font
  addFont() {
    if (this.form.valid) {
      const payload = {
        id: 0,
        name: this.form.value.nameField,
        fontFamily: this.form.value.fontFamilyField,
        fontFileName: this.form.value.fileSource?.name
          ? this.form.value.fileSource?.name
          : '',
        isDefault: false,
        enabled: this.form.value.enabledField,
      };

      this.fontsService
        .saveFont(payload)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<GlobalConfigurationFonts>) => {
            if (res.result) {
              this.getFontsData.emit();
              this.createForm();
              this.snackbarService.success(res.message);
              this.router.navigate(['admin/global-configuration/fonts']);
            } else {
              this.snackbarService.error(res.message);
            }
          },
          error: (e: Error) => {
            this.snackbarService.error(e.message);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
