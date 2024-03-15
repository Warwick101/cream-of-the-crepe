import { Component } from '@angular/core';
import {BrandTypes, WdkBaseConfig, WdkSnackBarService} from "@wjdk/acl";
import {HeaderComponent} from "./header/header.component";
import {environment} from "../environments/environment";
import {RegisterIconsService} from "./services/icon-service/register-icons.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  baseConfig;

  constructor(private snackBarService: WdkSnackBarService,
              // below is epic
              private registerIconsService: RegisterIconsService) {
    this.baseConfig = {
      appName: environment.title,
      appAbbr: 'gg',
      unbranded: false,
      homeRoute: '/home',
      brand: BrandTypes.WDS,
      // footerText: `© Copyright ${new Date().getFullYear()} WDS - ACL Custom Footer`,
      headerPortal: HeaderComponent,
    } as WdkBaseConfig;

    this.snackBarService.onDismiss.subscribe(() => {
      // this.handleOnDismissEvent();
    });
  }

}
