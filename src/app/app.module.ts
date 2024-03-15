import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {WdkBaseModule, WdkHeaderModule, WdkSnackBarModule} from "@wjdk/acl";
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {RegisterIconsService, WdkBaseModule, WdkHeaderModule, WdkSnackBarModule, WdkSnackBarService} from "@wjdk/acl";
import {HeaderComponent} from "./header/header.component";
import {DropdownDirective} from "./header/dropdown.directive";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    WdkBaseModule,
    MatIconModule,
    WdkHeaderModule,
    WdkSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
