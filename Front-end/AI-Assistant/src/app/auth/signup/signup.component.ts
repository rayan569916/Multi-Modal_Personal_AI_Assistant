import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div class="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-xl">
        <h2 class="mb-6 text-center text-3xl font-bold text-white">Create Account</h2>
        
        <form (ngSubmit)="onSubmit()" #signupForm="ngForm" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-400">Username</label>
            <input 
              type="text" 
              name="username" 
              [(ngModel)]="username" 
              required
              class="mt-1 block w-full rounded-lg bg-gray-700 border-none p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400">Password</label>
            <input 
              type="password" 
              name="password" 
              [(ngModel)]="password" 
              required
              minlength="6"
              class="mt-1 block w-full rounded-lg bg-gray-700 border-none p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            >
          </div>

          <div *ngIf="errorMessage" class="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
            {{ errorMessage }}
          </div>

          <button 
            type="submit" 
            [disabled]="!signupForm.form.valid || isLoading"
            class="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ isLoading ? 'Creating account...' : 'Sign Up' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-400">
          Already have an account? 
          <a routerLink="/login" class="font-semibold text-blue-400 hover:text-blue-300">Sign in</a>
        </p>
      </div>
    </div>
  `
})
export class SignupComponent {
    username = '';
    password = '';
    isLoading = false;
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.isLoading = true;
        this.errorMessage = '';

        this.authService.register({ username: this.username, password: this.password })
            .subscribe({
                next: () => {
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    this.errorMessage = err.error?.message || 'Registration failed';
                    this.isLoading = false;
                }
            });
    }
}
