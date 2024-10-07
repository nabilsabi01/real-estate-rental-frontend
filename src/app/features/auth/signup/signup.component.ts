import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from "../../../core/services/auth.service";
import { UserRole } from "../../../core/models/user-role.enum";
import { RegistrationRequest } from "../../../core/models/registration-request.model";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.animate-fadeInUp', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(60, [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;
  isLoading = false;
  UserRole = UserRole;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.pattern(/^\+?[0-9\s-()]{7,}$/)],
      role: [UserRole.GUEST, Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const registrationRequest: RegistrationRequest = this.prepareRegistrationRequest();

    this.authService.register(registrationRequest).subscribe({
      next: () => this.handleSuccessfulRegistration(),
      error: (error) => this.handleRegistrationError(error),
      complete: () => this.isLoading = false
    });
  }

  private prepareRegistrationRequest(): RegistrationRequest {
    return {
      email: this.signupForm.get('email')!.value,
      password: this.signupForm.get('password')!.value,
      firstName: this.signupForm.get('firstName')!.value,
      lastName: this.signupForm.get('lastName')!.value,
      phoneNumber: this.signupForm.get('phoneNumber')?.value || undefined,
      role: this.signupForm.get('role')!.value
    };
  }

  private handleSuccessfulRegistration(): void {
    this.snackBar.open('Registration successful! Please log in.', 'Close', { duration: 5000 });
    this.router.navigate(['/auth/login']);
  }

  private handleRegistrationError(error: any): void {
    this.snackBar.open('Registration failed: ' + error.message, 'Close', { duration: 5000 });
    this.isLoading = false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.signupForm.get(fieldName);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${this.capitalizeFirstLetter(fieldName)} is required`;
    }
    if (fieldName === 'email' && control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (fieldName === 'password' && control.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    if (fieldName === 'phoneNumber' && control.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }
    return '';
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}