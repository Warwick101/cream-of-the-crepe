import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuManagerService } from '../../services/menu-manager.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-menu-manager-item-create',
  templateUrl: './menu-manager-item-create.component.html',
  styleUrl: './menu-manager-item-create.component.scss'
})
export class MenuManagerItemCreateComponent {

  showSpinner = false;
  menuCategoryItemForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService,
    private menuManagerService: MenuManagerService
  ){

    this.menuCategoryItemForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl('', Validators.required),
    });

  }

  async onCreateCategoryItem(){
    this.showSpinner = true;
    const menuCategoryItemData: any = {
      id: uuidv4(),
      title: this.menuCategoryItemForm.value.title,
      price: this.menuCategoryItemForm.value.price,
    };

    // Check if caption exists in the form value
    if (this.menuCategoryItemForm.value.description) {
      menuCategoryItemData.description = this.menuCategoryItemForm.value.description;
    }

    await this.menuManagerService.createMenuCatergoryItem(this.data.cid, menuCategoryItemData)
    this.dialogRef.close();
    this.showSpinner = false;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
