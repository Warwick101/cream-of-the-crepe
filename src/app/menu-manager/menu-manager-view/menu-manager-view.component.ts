import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription, catchError, switchMap } from 'rxjs';
import { MenuManagerService } from '../services/menu-manager.service';
import { MenuManagerItemCreateComponent } from '../menu-manager-item/menu-manager-item-create/menu-manager-item-create.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MenuManagerItemEditComponent } from '../menu-manager-item/menu-manager-item-edit/menu-manager-item-edit.component';

@Component({
  selector: 'app-menu-manager-view',
  templateUrl: './menu-manager-view.component.html',
  styleUrl: './menu-manager-view.component.scss',
})
export class MenuManagerViewComponent implements OnDestroy {
  menuManagerViewSubscription: Subscription;
  cid: string = '';
  menuCategoryData: any;
  showSpinner = false;
  isDraggable: boolean = false;
  wasRearranged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuManagerService: MenuManagerService,
    private _dialog: MatDialog
  ) {
    this.showSpinner = true;
    this.menuManagerViewSubscription = this.route.params
      .pipe(
        switchMap((params: any) => {
          this.cid = params.cid;

          return this.menuManagerService.getMenuCategoryDetails(this.cid).pipe(
            catchError((error) => {
              // Handle the error and redirect
              const message = `Menu Category successfully removed`;
              this.router.navigate(['/menu-manager']);
              return EMPTY;
            })
          );
        })
      )
      .subscribe({
        next: (menuCategoryData) => {
          this.menuCategoryData = menuCategoryData;
          this.showSpinner = false;
        },
        error: (error) => {
          console.log(error);
          // Handle errors here
        },
        complete: () => {
          // Handle completion here
        },
      });
  }
  
  openCreateCategoryItemDialog() {
    let dialogRef = this._dialog.open(MenuManagerItemCreateComponent, {
      width: '500px',
      data: { cid: this.cid },
    });

    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

  openEditCategoryItemDialog(data: any, index: number) {
    let dialogRef = this._dialog.open(MenuManagerItemEditComponent, {
      width: '500px',
      data: {
        index: index,
        cid: this.cid,
        categoryItemData: data,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.menuCategoryData.items,
      event.previousIndex,
      event.currentIndex
    );
    this.wasRearranged = true;
  }

  saveRearrangedCategories() {
    this.menuManagerService.updateRearrangedCategoryItems(
      this.cid,
      this.menuCategoryData.items
    );
  }

  ngOnDestroy(): void {
    if (this.menuManagerViewSubscription) {
      this.menuManagerViewSubscription.unsubscribe();
    }
  }
}
