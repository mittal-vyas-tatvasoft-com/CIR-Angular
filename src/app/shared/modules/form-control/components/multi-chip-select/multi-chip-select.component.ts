import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControlModel } from '../../interface/form-control.interface';
import { ValueLabel } from 'src/app/shared/common/interfaces/label-value.interface';

@Component({
  selector: 'app-multi-chip-select',
  templateUrl: './multi-chip-select.component.html',
  styleUrls: ['./multi-chip-select.component.scss'],
})
export class MultiChipSelectComponent implements OnInit, OnChanges {
  @Input() formControlModel: FormControlModel;
  @Input() formControl: FormControl;
  @Input() form: FormGroup;
  @Input() allItems: ValueLabel[] = [];

  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredItems: Observable<ValueLabel[]>;
  fieldCtrl = new FormControl();

  @ViewChild('input') inputField: ElementRef;

  ngOnInit(): void {
    this.filteredItems = this.fieldCtrl.valueChanges.pipe(
      startWith(null),
      map((text: ValueLabel | null) =>
        text ? this._filter(text) : this.allItems.slice(),
      ),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.filteredItems = this.fieldCtrl.valueChanges.pipe(
        startWith(null),
        map((text: ValueLabel | null) =>
          text ? this._filter(text) : changes['allItems'].currentValue.slice(),
        ),
      );
    }
  }

  getSelectedItems(): ValueLabel[] {
    return this.formControl.value || [];
  }

  onClickSelect() {
    this.formControl.markAsTouched();
  }

  add(event: MatChipInputEvent): void {
    const selectedItems = this.getSelectedItems();
    const input = event.input;
    const value = event.value;
    const selectedItem = this.allItems.find(
      (item) => item.value === Number(value),
    );

    if ((value || '').trim() && selectedItem) {
      selectedItems.push(selectedItem);
    }

    if (input) {
      input.value = '';
    }

    this.formControl.setValue(selectedItems);
    this.fieldCtrl.setValue(null);
  }

  remove(ele: ValueLabel): void {
    const selectedItems = this.getSelectedItems();
    const index = selectedItems.findIndex((item) => item.value === ele.value);

    if (index >= 0) {
      selectedItems.splice(index, 1);
    }
    this.formControl.setValue(selectedItems);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedItem = this.allItems.find(
      (item) => item.value === event.option.value.value,
    );

    if (selectedItem) {
      this.formControl.setValue([...this.getSelectedItems(), selectedItem]);
      this.fieldCtrl.setValue(null);
      this.inputField.nativeElement.value = '';
    }
  }

  private _filter(value: ValueLabel): ValueLabel[] {
    const filterValue = value.label.toLowerCase();

    return this.allItems.filter(
      (item) => item.label.toLowerCase().indexOf(filterValue) === 0,
    );
  }

  isOptionDisabled(item: ValueLabel) {
    return this.getSelectedItems().some((i) => i.value === item.value);
  }
}
