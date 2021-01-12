import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

const VALIDATE_FIELDS = ['name', 'phone', 'email'];

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public contactForm: FormGroup = this._formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    email: ['', [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    address: this._formBuilder.group({
      street: [''],
      city: [''],
    }),
    website: [''],
  });

  public validationStatus = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data,
    private _bottomSheetRef: MatBottomSheetRef<FormComponent>,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.data.element) {
      this.contactForm.patchValue(this.data.element);
    }
  }

  public getErrorMessage(): string {
    let message = null;

    VALIDATE_FIELDS.forEach((item) => {
      if (this.contactForm.get(item).hasError('required')) {
        return message = 'You must enter a value';
      }

      if (this.contactForm.get(item).hasError('minlength') || this.contactForm.get(item).hasError('pattern')) {
        return message = 'You must enter a correct value';
      }
    });

    return message;
  }

  private checkValidationStatus(): boolean {
    if (this.contactForm.invalid) {
      return this.validationStatus = true;
    } else {
      return this.validationStatus = false;
    }
  }

  public save(): void {
    if (!this.checkValidationStatus() && !this.getErrorMessage()) {
      this._bottomSheetRef.dismiss(this.contactForm.value);
    }
  }

  public close(): void {
    this._bottomSheetRef.dismiss(null);
  }

}
