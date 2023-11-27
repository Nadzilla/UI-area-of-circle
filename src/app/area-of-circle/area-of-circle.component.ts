import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AreaOfCircleService } from './area-of-circle.service';

export enum KEY_CODE {
  ENTER = 'Enter'
}

export function createNumeric1to100Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
          return null;
      }
      // const isNumeric = /^[0-9]*$/.test(value);

      const numericValid = value >= 1 && value <= 100;

      return !numericValid ? { numericValid: true } : null;
  }
}

// export function isNumber(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {

//     const value = control.value;

//     if (!value) {
//         return null;
//     }

//     const numericValid = value >= 1 && value <= 100;

//     return !numericValid ? { numericValid: true } : null;
// }
// }

const NUMBER_REGEX = /\-?\d*\.?\d{1,2}/;

interface AreaOfCircleFormGroup {
  radius: FormControl;
}

@Component({
  selector: 'app-area-of-circle',
  templateUrl: './area-of-circle.component.html',
  styleUrls: ['./area-of-circle.component.scss']
})
export class AreaOfCircleComponent implements OnInit {

  formGroup: FormGroup<AreaOfCircleFormGroup>;

  buttonSubmitted: boolean = false;

  status: 'loading' | 'loaded' | 'error' = 'loaded';

  area: number;

  @HostListener('window:keyup', ['$event']) keyEventUp(event: KeyboardEvent) {
    if (event.code === KEY_CODE.ENTER) {
      this.getArea();
    }
  }

  constructor(private areaOfCircleService: AreaOfCircleService) {}

  ngOnInit(): void {
    this.initilizeFormGroup();
    this.subscribeToFormGroup();
  }

  initilizeFormGroup(): void {
    this.formGroup = new FormGroup({
      radius: new FormControl('', [Validators.required, Validators.pattern(NUMBER_REGEX), createNumeric1to100Validator()])
    });
  }

  subscribeToFormGroup(): void {
    this.formGroup.valueChanges.subscribe(newValues => {
      this.buttonSubmitted = false;
    })
  }

  getArea(): void {
    this.status = 'loading';
    if (this.formGroup.controls.radius.valid) {
      const radius = this.formGroup.get('radius')?.value;
      this.areaOfCircleService.getAreaOfCircle(radius).subscribe({
        next: (result => {
          this.area = result.area;
          
        }),
        complete: (() => {
          this.buttonSubmitted = true;
          this.status = 'loaded';
        }),
        error: (() => {
          this.status = 'error';
        })
      });
      // this.area = radius ? Math.PI * radius * radius : 0;
    } else {
      console.log('invalid');
      this.buttonSubmitted = true;

    }
  }

}
