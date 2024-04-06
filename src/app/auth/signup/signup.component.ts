import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})

export class SignupComponent {

  signupForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: new FormControl(''),
      acceptTerms: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.errorMessage = '';
    this.loading = true;
    const data = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.confirmPassword,
      acceptTerms: this.signupForm.value.acceptTerms,
    };

    this.authService
      .registerUser(
        {
          email: data.email,
          password: data.password,
        },
        data
      )      
      .catch((error) => {
        this.loading = false;
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'You have entered an invalid email';
            this.signupForm.controls['email'].setErrors({ incorrect: true });
            break;
          case 'auth/email-already-in-use':
            this.errorMessage =
              'This email address has already been registered';
            this.signupForm.controls['email'].setErrors({ incorrect: true });
            break;
          default:
            this.errorMessage = error.code;
        }
      });
  }
}
