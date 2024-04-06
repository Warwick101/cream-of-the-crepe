import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu-manager-create',
  templateUrl: './menu-manager-create.component.html',
  styleUrl: './menu-manager-create.component.scss'
})
export class MenuManagerCreateComponent {
  showSpinner = false;
  menuCategoryForm: FormGroup;



  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService
  ){

    this.menuCategoryForm = this.fb.group({
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      caption: new FormControl('', Validators.required),
      categoryImage: [null, Validators.required],
    });
  }

  onCreateCategory(){

  }

  onCancel() {
    this.dialogRef.close();
  }
}
