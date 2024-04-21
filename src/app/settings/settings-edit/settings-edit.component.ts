import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrl: './settings-edit.component.scss',
})
export class SettingsEditComponent implements OnDestroy {
  showSpinner = false;
  settingsEditSubscription: Subscription;
  settingsEditForm: FormGroup;
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
    this.settingsEditForm = this.fb.group({
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

    this.settingsEditSubscription = this.settingsService
      .getSettingsDetails(this.data.sid)
      .subscribe((settings) => {
        console.log(settings);
        this.settingsEditForm.patchValue({
          phoneNumber: settings.phoneNumber,
        });
        settings.tradingHours.forEach((tradingHour: any) => {
          // Get the day control based on the day from the tradingHour object
          const dayControl = this.settingsEditForm.get(
            `tradingHours.${tradingHour.day}`
          );

          // Check if the dayControl exists
          if (dayControl) {
            // Patch the values into the day control
            dayControl.patchValue({
              open: tradingHour.open,
              from: tradingHour.from,
              to: tradingHour.to,
            });
          }
        });
      });
  }

  shouldShowTimeInputs(day: string): boolean {
    const dayFormGroup = this.settingsEditForm.get(
      `tradingHours.${day.toLowerCase()}`
    ) as FormGroup;
    return dayFormGroup.get('open')?.value;
  }

  isSubmitDisabled(): boolean {
    return Object.keys(
      this.settingsEditForm.controls['tradingHours'].value
    ).some((day) => {
      const dayFormGroup = this.settingsEditForm.get(
        `tradingHours.${day}`
      ) as FormGroup;
      return (
        dayFormGroup.get('open')?.value &&
        (!dayFormGroup.get('from')?.value || !dayFormGroup.get('to')?.value)
      );
    });
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

  async onEditSettings() {
    const tradingHoursArray = Object.keys(
      this.settingsEditForm.value.tradingHours
    ).map((key) => ({
      day: key,
      ...this.settingsEditForm.value.tradingHours[key],
    }));

    const settingsData = {
      phoneNumber: this.settingsEditForm.value.phoneNumber,
      tradingHours: tradingHoursArray,
    };
    await this.settingsService.setSettingsData(this.data.sid, settingsData);
    this.dialogRef.close();
    this.showSpinner = false;
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.settingsEditSubscription) {
      this.settingsEditSubscription.unsubscribe();
    }
  }
}
