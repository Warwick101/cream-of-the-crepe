import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";

const routes: Routes = [
  {path: '', redirectTo: 'menu', pathMatch: 'full'},
  {path: 'menu', component: MenuComponent, title: 'Menu'},
  {path: '**', component: HomeComponent, title: 'Home'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
