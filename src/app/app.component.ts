import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {environment} from "../environments/environment";
import {RegisterIconsService} from "./services/icon-service/register-icons.service";
import {BrandTypes, WdsBaseConfig, WdsSnackBarService} from "warlock-design-system";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  baseConfig;

  constructor(private snackBarService: WdsSnackBarService,
              // below is epic
              private registerIconsService: RegisterIconsService) {
    this.baseConfig = {
      appName: environment.title,
      appAbbr: 'cotc',
      unbranded: false,
      homeRoute: '/home',
      brand: BrandTypes.WDS,
      // footerText: `© Copyright ${new Date().getFullYear()} WDS - ACL Custom Footer`,
      headerPortal: HeaderComponent,
    } as WdsBaseConfig;

    this.snackBarService.onDismiss.subscribe(() => {
      // this.handleOnDismissEvent();
    });
  }

}
