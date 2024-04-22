import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { MenuManagerListComponent } from './menu-manager/menu-manager-list/menu-manager-list.component';
import { MenuManagerViewComponent } from './menu-manager/menu-manager-view/menu-manager-view.component';
import { SettingsViewComponent } from './settings/settings-view/settings-view.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { adminGuard } from './auth/guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'menu', pathMatch: 'full'},
  {path: 'menu', component: MenuComponent, title: 'Menu'},
  {path: 'signup', component: SignupComponent, title: 'Signup'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'settings', component: SettingsViewComponent, title: 'Settings', canActivate: [adminGuard]},
  {path: 'contact', component: ContactComponent, title: 'Contact'},
  {path: 'menu-manager', component: MenuManagerListComponent, title: 'Menu Manager', canActivate: [adminGuard]},
  { path: 'menu-manager/:cid', component: MenuManagerViewComponent, title: 'Menu Manager View', canActivate: [adminGuard]},



  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
