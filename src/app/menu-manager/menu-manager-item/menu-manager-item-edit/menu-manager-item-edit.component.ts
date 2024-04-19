import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuManagerService } from '../../services/menu-manager.service';

@Component({
  selector: 'app-menu-manager-item-edit', 
  templateUrl: './menu-manager-item-edit.component.html',
  styleUrl: './menu-manager-item-edit.component.scss'
})
export class MenuManagerItemEditComponent {
  showSpinner = false;
  menuCategoryItemEditForm: FormGroup;
  showConfirmation = false;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService,
    private menuManagerService: MenuManagerService
  ){
    this.menuCategoryItemEditForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl('', Validators.required),
    });
   

    this.menuCategoryItemEditForm.patchValue({
      title: this.data.categoryItemData.title,
      price:  this.data.categoryItemData.price
    })

    if(this.data.categoryItemData.description){
      this.menuCategoryItemEditForm.patchValue({
        description: this.data.categoryItemData.description,        
      })
    }
  }

  async onEditCategoryItem(){
    this.showSpinner = true;
    const menuCategoryItemEditedData: any = {
      id: this.data.categoryItemData.id,
      title: this.menuCategoryItemEditForm.value.title,
      price: this.menuCategoryItemEditForm.value.price,
    };

    // Check if caption exists in the form value
    if (this.menuCategoryItemEditForm.value.description) {
      menuCategoryItemEditedData.description = this.menuCategoryItemEditForm.value.description;
    }

    await this.menuManagerService.updateMenuItem(this.data.cid, menuCategoryItemEditedData)
    this.dialogRef.close();
    this.showSpinner = false;
  }

  onCancel() {
    this.dialogRef.close();
  }

  showRemoveConfirmation(): void {
    this.showConfirmation = true;
  }

  async onRemoveAdvertiser() {
    this.showSpinner = true;    
    this.showConfirmation = false;
    
   
    this.dialogRef.close();
    this.showSpinner = false;
  }

}
