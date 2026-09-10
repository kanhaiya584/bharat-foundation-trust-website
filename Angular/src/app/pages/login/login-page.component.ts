import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  template: `
    <section class="login-shell">
      <div class="surface login-card">
        <div class="login-card__head">
          <div class="login-card__logo"><img src="assets/bharat-foundation-trust-logo.png" alt="Bharat Foundation Trust logo"></div>
          <div>
            <p class="section__eyebrow">Secure Access</p>
            <h1>Login</h1>
            <p>Admin only access for authorized trust personnel.</p>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="login-form">
          <label class="field">
            <span>Password</span>
            <input type="password" formControlName="password" placeholder="Enter password">
          </label>
          <button class="btn btn-primary" type="submit" [disabled]="loading">{{ loading ? 'Signing in...' : 'Login' }}</button>
          <p class="login-form__error" *ngIf="error">{{ error }}</p>
        </form>

        <p class="login-card__hint">Only authorized personnel can access this area. No public registration is available.</p>
      </div>

      <aside class="login-visual">
        <div class="login-visual__icon">🔒</div>
        <h2>Secure Access</h2>
        <p>This dashboard is for authorized users only. Please log in to continue.</p>
      </aside>
    </section>
  `,
  styles: [`
    .login-shell { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: stretch; min-height: 72vh; }
    .login-card, .login-visual { border-radius: 30px; overflow: hidden; }
    .login-card { padding: 30px; display: grid; gap: 20px; align-content: center; }
    .login-card__head { display: flex; gap: 16px; align-items: center; }
    .login-card__logo { width: 60px; height: 60px; border-radius: 20px; display: grid; place-items: center; background: #fff; padding: 3px; overflow: hidden; box-shadow: 0 8px 20px rgba(16,52,106,.1); }
    .login-card__logo img { width: 100%; height: 100%; object-fit: contain; }
    .login-card__head h1 { margin: 0; font-size: clamp(2rem, 4vw, 2.8rem); }
    .login-card__head p { margin: 4px 0 0; color: var(--muted); }
    .login-form { display: grid; gap: 14px; max-width: 420px; }
    .field { display: grid; gap: 8px; }
    .field span { font-weight: 800; color: var(--navy-2); }
    .field input { width: 100%; border-radius: 14px; border: 1px solid rgba(23,50,95,.12); padding: 0 14px; min-height: 52px; font: inherit; }
    .login-form__error { margin: 0; color: #b42318; font-weight: 700; }
    .login-card__hint { margin: 0; color: var(--muted); }
    .login-visual { background: linear-gradient(135deg, rgba(8,32,73,.98), rgba(15,88,51,.82)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80') center/cover; color: #fff; display: grid; place-items: center; text-align: center; padding: 28px; }
    .login-visual__icon { width: 86px; height: 86px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.12); font-size: 2rem; margin-bottom: 12px; }
    .login-visual h2 { margin: 0; font-size: clamp(1.8rem, 3vw, 2.6rem); }
    .login-visual p { max-width: 34ch; color: rgba(255,255,255,.82); }
    @media (max-width: 900px) { .login-shell { grid-template-columns: 1fr; } }
  `]
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    password: ['', [Validators.required]],
  });

  constructor() {
    this.seo.setPage('Login', 'Secure login page for trust personnel with protected dashboard access.');
  }

  submit(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please enter your login credentials.';
      return;
    }

    this.loading = true;
    const { password } = this.form.getRawValue();
    this.auth.login(password).subscribe({
      next: () => {
        this.loading = false;
        void this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid credentials or login is temporarily unavailable.';
      },
    });
  }
}
