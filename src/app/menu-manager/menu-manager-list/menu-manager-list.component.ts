import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuManagerCreateComponent } from '../menu-manager-create/menu-manager-create.component';

@Component({
  selector: 'app-menu-manager-list',
  templateUrl: './menu-manager-list.component.html',
  styleUrl: './menu-manager-list.component.scss'
})
export class MenuManagerListComponent {  
  constructor(
    private _dialog: MatDialog,
  ){

  }

  openCreateCategorykDialog() {  

    let dialogRef = this._dialog.open(MenuManagerCreateComponent, {
      width: '500px',
      // data: { campaign: this.campaign },
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

}
