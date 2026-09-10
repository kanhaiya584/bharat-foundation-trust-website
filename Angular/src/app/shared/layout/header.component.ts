import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/">
        <span class="brand__mark">
            <img src="assets/bharat-foundation-trust-logo.png" alt="Bharat Foundation Trust logo">
        </span>
        <span>
          <strong>{{ language.label('Bharat Foundation Trust', 'भरत फाउंडेशन ट्रस्ट') }}</strong>
          <small>{{ language.label('Help • Support • Transform', 'मदद • सहयोग • परिवर्तन') }}</small>
        </span>
      </a>

      <button class="language-toggle" type="button" (click)="language.toggle()" [attr.aria-label]="language.language() === 'en' ? 'Switch to Hindi' : 'Switch to English'">
        <span [class.active]="language.language() === 'hi'">हिन्दी</span>
        <span [class.active]="language.language() === 'en'">English</span>
      </button>

      <button class="nav-toggle" type="button" (click)="toggleMenu()" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>

      <nav class="nav" [class.nav--open]="menuOpen()">
        <a class="nav__link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">{{ language.label('Home', 'होम') }}</a>
        <a class="nav__link" routerLink="/about" routerLinkActive="active" (click)="closeMenu()">{{ language.label('About Us', 'हमारे बारे में') }}</a>
        <a class="nav__link" routerLink="/causes" routerLinkActive="active" (click)="closeMenu()">{{ language.label('Our Work', 'हमारा कार्य') }}</a>
        <a class="nav__link" routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">{{ language.label('Contact', 'संपर्क') }}</a>
        <a class="nav__login" routerLink="/login" (click)="closeMenu()">{{ language.label('Login', 'लॉगिन') }}</a>
      </nav>
      <a class="btn btn-primary nav__donate" routerLink="/donate">{{ language.label('Donate Now', 'दान करें') }}</a>
    </header>
  `,
  styles: [`
    .site-header { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px clamp(18px, 4vw, 52px); position: sticky; top: 0; z-index: 60; background: #102b50; box-shadow: 0 10px 28px rgba(5, 20, 43, .2); }
    .brand { display: inline-flex; align-items: center; gap: 12px; color: #f7fbff; text-decoration: none; min-width: max-content; }
    .brand__mark { width: 46px; height: 46px; border-radius: 14px; background: linear-gradient(145deg, #effbf3, #ccebd8); display: grid; place-items: center; color: #0f863f; box-shadow: 0 8px 20px rgba(0, 0, 0, .16); }
    .brand__mark img { width: 100%; height: 100%; object-fit: contain; border-radius: inherit; }
    .brand strong { display: block; font-size: 1.08rem; line-height: 1.1; }
    .brand small { display: block; color: rgba(232, 241, 250, .68); margin-top: 3px; }
    .language-toggle { display: inline-flex; align-items: center; gap: 2px; border: 1px solid rgba(255,255,255,.22); border-radius: 999px; padding: 3px; background: rgba(255,255,255,.08); color: #dce9f7; font-size: .72rem; font-weight: 700; }
    .language-toggle span { padding: 6px 9px; border-radius: 999px; transition: background .22s ease, color .22s ease; }
    .language-toggle span.active { background: #f4fbf7; color: #0c7136; box-shadow: 0 3px 10px rgba(0,0,0,.14); }
    .nav { display: flex; align-items: center; gap: 6px; margin-left: auto; }
    .nav a { position: relative; color: rgba(244, 249, 255, .78); text-decoration: none; font-weight: 600; font-size: .92rem; padding: 10px 13px; border-radius: 10px; transition: color .22s ease, background .22s ease; }
    .nav a.active, .nav a:hover { color: #fff; background: rgba(255,255,255,.1); }
    .nav a.active::after { content: ''; position: absolute; left: 13px; right: 13px; bottom: 4px; height: 2px; border-radius: 2px; background: #55cf7c; }
    .nav__login { border: 1px solid rgba(255,255,255,.18); margin-left: 4px; }
    .nav__donate { box-shadow: 0 8px 20px rgba(0, 0, 0, .18); }
    .nav-toggle { display: none; width: 46px; height: 46px; border: 0; border-radius: 14px; background: #fff; box-shadow: 0 10px 24px rgba(16,52,106,.08); }
    .nav-toggle span { display: block; width: 20px; height: 2px; margin: 4px auto; background: #17325f; border-radius: 999px; }
    @media (max-width: 1024px) {
      .site-header { position: sticky; padding: 12px 14px; }
      .brand { min-width: 0; gap: 9px; }
      .brand__mark { width: 42px; height: 42px; border-radius: 14px; }
      .brand__mark svg { width: 25px; height: 25px; }
      .brand strong { font-size: .88rem; white-space: nowrap; }
      .brand small { font-size: .65rem; white-space: nowrap; }
      .language-toggle { margin-left: auto; order: 1; }
      .nav__donate { display: inline-flex; padding: 10px 12px; font-size: .76rem; order: 2; }
      .nav-toggle { display: inline-block; }
      .nav { position: absolute; top: calc(100% + 8px); left: 12px; right: 12px; flex-direction: column; align-items: stretch; gap: 4px; padding: 14px; border-radius: 22px; background: #18375f; box-shadow: 0 20px 55px rgba(5, 20, 43, .3); transform-origin: top; transform: scaleY(0); opacity: 0; pointer-events: none; }
      .nav--open { transform: scaleY(1); opacity: 1; pointer-events: auto; }
      .nav a, .nav .btn { width: 100%; justify-content: flex-start; padding: 10px 12px; border-radius: 12px; }
      .nav a.active { background: rgba(255,255,255,.11); }
      .nav__login { text-align: left; }
    }
    @media (max-width: 720px) {
      .site-header { position: relative; gap: 10px; padding: 10px 16px 12px; background: #fff; box-shadow: none; }
      .brand { color: #0d4b87; gap: 10px; }
      .brand__mark { width: 48px; height: 48px; border-radius: 50%; background: #fff; box-shadow: none; }
      .brand strong { font-size: 1.02rem; color: #0d4b87; }
      .brand small { color: #11984a; font-size: .7rem; font-weight: 800; }
      .language-toggle { order: 0; margin-left: auto; color: #0d4b87; background: #fff; border-color: #dce8f1; font-size: .72rem; }
      .language-toggle span.active { background: #11984a; color: #fff; }
      .nav__donate { display: none; }
      .nav__link { display: none; }
      .nav-toggle { order: 2; width: 42px; height: 42px; background: transparent; box-shadow: none; }
      .nav-toggle span { width: 26px; height: 3px; background: #0d4b87; }
      .nav { top: 100%; left: 12px; right: 12px; background: #0d2d5a; }
    }
    @media (max-width: 430px) { .language-toggle { display: inline-flex; } }
  `]
})
export class HeaderComponent {
  readonly menuOpen = signal(false);

  constructor(readonly language: LanguageService) {}

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
