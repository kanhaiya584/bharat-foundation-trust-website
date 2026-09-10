import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly tokenKey = 'trust_admin_token';

  private readonly tokenSignal = signal<string | null>(localStorage.getItem(this.tokenKey));

  readonly isAuthenticated = computed(() => Boolean(this.tokenSignal()));

  login(password: string) {
    return this.api.login({ password }).pipe(
      tap((response) => this.setSession(response.data.token))
    );
  }

  logout() {
    return this.api.logout().pipe(
      tap(() => {
        this.clearSession();
        void this.router.navigate(['/login']);
      })
    );
  }

  token(): string | null {
    return this.tokenSignal();
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSignal.set(null);
  }

  private setSession(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSignal.set(token);
  }
}
