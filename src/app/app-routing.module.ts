import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { MenuManagerListComponent } from './menu-manager/menu-manager-list/menu-manager-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'menu', pathMatch: 'full'},
  {path: 'menu', component: MenuComponent, title: 'Menu'},
  {path: 'signup', component: SignupComponent, title: 'Signup'},
  {path: 'login', component: LoginComponent, title: 'Login'},
  {path: 'menu-manager', component: MenuManagerListComponent, title: 'Menu Manager'},



  {path: '**', component: HomeComponent, title: 'Home'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
