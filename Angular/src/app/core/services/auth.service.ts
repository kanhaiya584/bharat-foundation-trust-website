import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthApiService } from './api.service';

interface AuthUser {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly tokenKey = 'trust_admin_token';
  private readonly userKey = 'trust_admin_user';

  private readonly tokenSignal = signal<string | null>(localStorage.getItem(this.tokenKey));
  private readonly userSignal = signal<AuthUser | null>(this.readUser());

  readonly isAuthenticated = computed(() => Boolean(this.tokenSignal()));
  readonly user = computed(() => this.userSignal());

  login(login: string, password: string) {
    return this.api.login({ login, password }).pipe(
      tap((response) => this.setSession(response.data.token, response.data.user))
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
    localStorage.removeItem(this.userKey);
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  private setSession(token: string, user: AuthUser): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }

  private readUser(): AuthUser | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
