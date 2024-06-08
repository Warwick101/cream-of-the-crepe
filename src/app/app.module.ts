import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { MenuManagerListComponent } from './menu-manager/menu-manager-list/menu-manager-list.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
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
import {CommonModule} from "@angular/common";
import {MenuComponent} from "./menu/menu.component";
import {MatDialogModule} from '@angular/material/dialog';
import { MenuManagerCreateComponent } from './menu-manager/menu-manager-create/menu-manager-create.component';
import {ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './shared/image-cropper/image-cropper.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from "@angular/material/tabs";
import {FooterComponent} from "./footer/footer.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MenuManagerViewComponent } from './menu-manager/menu-manager-view/menu-manager-view.component';
import { MenuManagerItemCreateComponent } from './menu-manager/menu-manager-item/menu-manager-item-create/menu-manager-item-create.component';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { MenuManagerItemEditComponent } from './menu-manager/menu-manager-item/menu-manager-item-edit/menu-manager-item-edit.component';
import { MenuManagerEditComponent } from './menu-manager/menu-manager-edit/menu-manager-edit.component';
import {MatButtonModule} from "@angular/material/button";
import { SettingsViewComponent } from './settings/settings-view/settings-view.component';
import { SettingsCreateComponent } from './settings/settings-create/settings-create.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SettingsEditComponent } from './settings/settings-edit/settings-edit.component';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatMenuModule} from "@angular/material/menu";
import {MessageBoardComponent} from "./message-board/message-board.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    MenuComponent,
    SignupComponent,
    LoginComponent,
    MenuManagerListComponent,
    MenuManagerCreateComponent,
    ImageCropperComponent,
    MenuManagerViewComponent,
    MenuManagerItemCreateComponent,
    FooterComponent,
    BackButtonComponent,
    MenuManagerItemEditComponent,
    MessageBoardComponent,
    MenuManagerEditComponent,
    SettingsViewComponent,
    SettingsCreateComponent,
    SettingsEditComponent,
    ContactComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    WdkBaseModule,
    MatIconModule,
    WdkHeaderModule,
    WdkSnackBarModule,
    MatButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ImageCropperModule,
    MatSliderModule,
    DragDropModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
