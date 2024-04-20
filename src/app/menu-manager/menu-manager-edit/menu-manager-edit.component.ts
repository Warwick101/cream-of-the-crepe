import { Component, Inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MenuManagerService } from '../services/menu-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-manager-edit',
  templateUrl: './menu-manager-edit.component.html',
  styleUrl: './menu-manager-edit.component.scss',
})
export class MenuManagerEditComponent implements OnDestroy{
  showSpinner = false;
  menuCategoryEditForm: FormGroup;
  selectedFile: File | null = null;
  menuEditSubscription: Subscription;
  menuDetail: any;
  isImageSelected: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService,
    private menuManagerService: MenuManagerService
  ) {
    this.menuCategoryEditForm = this.fb.group({
      category: new FormControl('', Validators.required),
      // type: new FormControl('', Validators.required),
      caption: new FormControl(''),
      categoryImage: [null],
    });

    this.menuEditSubscription = this.menuManagerService
      .getMenuCategoryDetails(this.data.cid)
      .subscribe((menuDetail) => { 
        this.menuDetail = menuDetail;       
        this.menuCategoryEditForm.patchValue({
          category: menuDetail.category,
        });
        if (menuDetail.caption) {
          this.menuCategoryEditForm.patchValue({
            caption: menuDetail.caption,
          });
        }
        if (menuDetail.categoryImage) {
          this.menuCategoryEditForm.patchValue({
            categoryImage: menuDetail.categoryImage,
          });
        }
      });
  }

  croppedImage(imageData: any) {
    if (imageData) {
      this.isImageSelected = true;
      this.selectedFile = imageData.file;
      // Set the selected file to networkLogo FormControl
      this.menuCategoryEditForm.get('categoryImage')!.setValue(imageData.file);
    }
  }

  async onEditCategory() {
    this.showSpinner = true;
    const menuCategoryData: any = {
      category: this.menuCategoryEditForm.value.category,
      categoryImage: this.menuCategoryEditForm.value.categoryImage,
      categoryImageFile: this.menuDetail.categoryImageFile,
      createdAt: this.menuDetail.createdAt,
      order: this.menuDetail.order,
      items: this.menuDetail.items
    };
    // Check if caption exists in the form value
    if (this.menuCategoryEditForm.value.caption) {     
      menuCategoryData.caption = this.menuCategoryEditForm.value.caption;
    } 

    await this.menuManagerService.editMenuCategory(
      this.data.cid,
      menuCategoryData,
      this.selectedFile,
      () => {
        this.dialogRef.close();
        this.showSpinner = false;
      }
    );
  }

  async onRemoveCategory(){
    this.showSpinner = true;
    if(this.menuEditSubscription){
      this.menuEditSubscription.unsubscribe();
    }
    await this.menuManagerService.removeCategoryDocument(this.data.cid, this.menuDetail.categoryImageFile)
    this.dialogRef.close();
    this.showSpinner = false;
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if(this.menuEditSubscription){
      this.menuEditSubscription.unsubscribe();
    }
  }
}
