import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuManagerCreateComponent } from '../menu-manager-create/menu-manager-create.component';
import { MenuManagerService } from '../services/menu-manager.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-menu-manager-list',
  templateUrl: './menu-manager-list.component.html',
  styleUrl: './menu-manager-list.component.scss'
})
export class MenuManagerListComponent implements OnDestroy{  
  menuCategoriesSubscription: Subscription;
  menuCategoriesData: any;
  isDraggable: boolean = false;
  wasRearranged: boolean = false;


  constructor(
    private _dialog: MatDialog,
    private menuManagerService: MenuManagerService
  ){

    this.menuCategoriesSubscription = this.menuManagerService.getMenuCategoriesCollection().subscribe(menuCategoriesData => {
      this.menuCategoriesData = menuCategoriesData;
    })

  }

  openCreateCategoryDialog() {  

    let dialogRef = this._dialog.open(MenuManagerCreateComponent, {
      width: '500px',
      // data: { campaign: this.campaign },
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.menuCategoriesData, event.previousIndex, event.currentIndex);
    this.wasRearranged = true;
  }

  saveRearrangedCategories(){  
    this.menuCategoriesData.forEach((menuCategory: any, index: number) => {
      menuCategory.order = index;
    });
    this.menuManagerService.updateRearrangedCategories(this.menuCategoriesData);
  }

  ngOnDestroy(): void {
    if(this.menuCategoriesSubscription){
      this.menuCategoriesSubscription.unsubscribe();
    }
  }

}
