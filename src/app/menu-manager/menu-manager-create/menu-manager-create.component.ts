import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuManagerService } from '../services/menu-manager.service';

@Component({
  selector: 'app-menu-manager-create',
  templateUrl: './menu-manager-create.component.html',
  styleUrl: './menu-manager-create.component.scss'
})
export class MenuManagerCreateComponent {
  showSpinner = false;
  menuCategoryForm: FormGroup;
  selectedFile: File | null = null;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService,
    private menuManagerService: MenuManagerService
  ){

    this.menuCategoryForm = this.fb.group({
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      caption: new FormControl(''),
      categoryImage: [null],
    });
  }

  croppedImage(imageData: any) {
    if (imageData) {
      this.selectedFile = imageData.file;
      // Set the selected file to networkLogo FormControl
      this.menuCategoryForm.get('categoryImage')!.setValue(imageData.file);
    }
  }

  async onCreateCategory(){
    this.showSpinner = true;
    const menuCategoryData = {
      category: this.menuCategoryForm.value.category,
      type: this.menuCategoryForm.value.type,
      caption: this.menuCategoryForm.value.caption,
    };

    await this.menuManagerService.createMenuCategory(menuCategoryData, this.selectedFile, () => {
      this.dialogRef.close();
      this.showSpinner = false;
    });

  }

  onCancel() {
    this.dialogRef.close();
  }
}