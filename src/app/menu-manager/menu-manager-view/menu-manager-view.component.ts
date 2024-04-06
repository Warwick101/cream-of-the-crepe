import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription, catchError, switchMap } from 'rxjs';
import { MenuManagerService } from '../services/menu-manager.service';
import { MenuManagerItemCreateComponent } from '../menu-manager-item/menu-manager-item-create/menu-manager-item-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-manager-view',
  templateUrl: './menu-manager-view.component.html',
  styleUrl: './menu-manager-view.component.scss',
})
export class MenuManagerViewComponent {
  menuManagerViewSubscription: Subscription;
  cid: string = '';
  menuCategoryData: any;
  showSpinner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuManagerService: MenuManagerService,
    private _dialog: MatDialog,

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

  openCreateCategoryItemDialog(){
    let dialogRef = this._dialog.open(MenuManagerItemCreateComponent, {
      width: '500px',
      data: { cid: this.cid },
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
}
