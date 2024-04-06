import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuManagerCreateComponent } from '../menu-manager-create/menu-manager-create.component';
import { MenuManagerService } from '../services/menu-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-manager-list',
  templateUrl: './menu-manager-list.component.html',
  styleUrl: './menu-manager-list.component.scss'
})
export class MenuManagerListComponent implements OnDestroy{  
  menuCategoriesSubscription: Subscription;

  constructor(
    private _dialog: MatDialog,
    private menuManagerService: MenuManagerService
  ){

    this.menuCategoriesSubscription = this.menuManagerService.getMenuCategoriesCollection().subscribe(menuCategoriesData => {
      console.log(menuCategoriesData)
    })

  }

  openCreateCategorykDialog() {  

    let dialogRef = this._dialog.open(MenuManagerCreateComponent, {
      width: '500px',
      // data: { campaign: this.campaign },
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  ngOnDestroy(): void {
    if(this.menuCategoriesSubscription){
      this.menuCategoriesSubscription.unsubscribe();
    }
  }

}
