import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SettingsService } from '../services/settings.service';
import { SettingsCreateComponent } from '../settings-create/settings-create.component';
import { Subscription } from 'rxjs';
import { SettingsEditComponent } from '../settings-edit/settings-edit.component';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss',
})
export class SettingsViewComponent implements OnDestroy {
  showSpinner = false;
  settingsSubscription: Subscription;
  settings: any;
  isSettings: boolean = false;
  sortedDays: any;
  sortedTradingHours: any;

  constructor(
    private _dialog: MatDialog,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {
    this.settingsSubscription = this.settingsService
      .getSettingsCollection()
      .subscribe((settings) => {
        this.showSpinner = true;
        if (settings.length > 0) {
          this.settings = settings[0];
          this.isSettings = true;    
          console.log(this.settings);
        } else {
          this.isSettings = false;
          console.log('There is no setting document');
        }
        this.showSpinner = false;
      });
  }  

  onCreateSettings() {
    let dialogRef = this._dialog.open(SettingsCreateComponent, {
      width: '800px',
      // data: {},
    });

    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

  onEditSettings() {
    let dialogRef = this._dialog.open(SettingsEditComponent, {
      width: '800px',
      data: {sid: this.settings.sid},
    });

    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

  ngOnDestroy(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }
}
