import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings-create',
  templateUrl: './settings-create.component.html',
  styleUrl: './settings-create.component.scss',
})
export class SettingsCreateComponent {
  showSpinner = false;
  settingsForm: FormGroup;
  daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {
    this.settingsForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      tradingHours: this.fb.group({
        // Create nested form controls for each day with index
        monday: this.createDayControl('monday', 0),
        tuesday: this.createDayControl('tuesday', 1),
        wednesday: this.createDayControl('wednesday', 2),
        thursday: this.createDayControl('thursday', 3),
        friday: this.createDayControl('friday', 4),
        saturday: this.createDayControl('saturday', 5),
        sunday: this.createDayControl('sunday', 6),
      }),
    });
  }

  shouldShowTimeInputs(day: string): boolean {
    const dayFormGroup = this.settingsForm.get(
      `tradingHours.${day.toLowerCase()}`
    ) as FormGroup;
    return dayFormGroup.get('open')?.value;
  }

  isSubmitDisabled(): boolean {
    return Object.keys(this.settingsForm.controls['tradingHours'].value).some(
      (day) => {
        const dayFormGroup = this.settingsForm.get(
          `tradingHours.${day}`
        ) as FormGroup;
        return (
          dayFormGroup.get('open')?.value &&
          (!dayFormGroup.get('from')?.value || !dayFormGroup.get('to')?.value)
        );
      }
    );
  }

  // Function to create a form control for a day with index
  createDayControl(day: string, index: number) {
    return this.fb.group({
      index: [index],
      from: [''],
      to: [''],
      open: [false],
    });
  }

  async onCreateSettings() {   
    const tradingHoursArray = Object.keys(
      this.settingsForm.value.tradingHours
    ).map((key) => ({
      day: key,
      ...this.settingsForm.value.tradingHours[key],
    }));

    const settingsData = {
      phoneNumber: this.settingsForm.value.phoneNumber,
      tradingHours: tradingHoursArray
    }    
    await this.settingsService.addSettingsData(settingsData);
    this.dialogRef.close();
    this.showSpinner = false;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
