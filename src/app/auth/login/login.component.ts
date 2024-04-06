import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  resetPasswordForm: FormGroup = new FormGroup({});
  resetPassword = false;
  restSuccessful = false;
  state = 'closed';
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    // private _dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      resetEmail: ['', [Validators.email]],
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService
      .login(this.loginForm.value)
      .then(() => {
        this.router.navigate(['networks']).catch((error: any) => {
          console.warn(error);
        });
      })
      .catch((error: any) => {
        this.loading = false;
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'You have entered an invalid email';
            this.loginForm.controls['email'].setErrors({ incorrect: true });
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'Email address does not exist';
            this.loginForm.controls['email'].setErrors({ incorrect: true });
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password';
            this.loginForm.controls['password'].setErrors({ incorrect: true });
            break;
          default:
            this.errorMessage = error.code;
        }
      });
  }

  onReset() {
    this.authService
      .resetPassword(this.resetPasswordForm.value.resetEmail)
      .then(() => {
        // Password reset successful
        this.restSuccessful = true;
      })
      .catch((error) => {
        // Password reset failed
        console.error('Error sending password reset email:', error.message);
        // Handle error or display error message to the user
      });
  }

  onCancel() {
    this.resetPassword = false;
  }

  reset() {
    this.resetPassword = true;
  }

  backToLogin() {
    this.resetPassword = false;
    this.restSuccessful = false;
  }
}
