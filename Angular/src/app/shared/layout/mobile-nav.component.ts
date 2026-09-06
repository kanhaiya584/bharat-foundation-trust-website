import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="mobile-nav" aria-label="Mobile navigation" [style.grid-template-columns]="'repeat(' + visibleItems().length + ', 1fr)'">
      @for (item of visibleItems(); track item.route) {
        <a [routerLink]="item.route" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: item.route === '/' }">
          <span class="mobile-nav__icon">{{ item.icon }}</span>
          <span>{{ language.language() === 'hi' ? item.hi : item.en }}</span>
        </a>
      }
    </nav>
  `,
  styles: [`
    .mobile-nav { display: none; }
    @media (max-width: 720px) {
      .mobile-nav { position: fixed; display: grid; left: 0; right: 0; bottom: 0; z-index: 80; padding: 8px 8px max(8px, env(safe-area-inset-bottom)); background: linear-gradient(180deg, #123a66, #0a2447); box-shadow: 0 -10px 26px rgba(4,17,38,.35); }
      .mobile-nav a { min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 3px 2px; color: rgba(255,255,255,.72); text-decoration: none; font-size: .76rem; font-weight: 800; }
      .mobile-nav__icon { width: 34px; height: 30px; display: grid; place-items: center; border-radius: 12px; font-size: 1.3rem; background: rgba(255,255,255,.1); color: rgba(255,255,255,.92); transition: background .2s ease, color .2s ease; }
      .mobile-nav a.active { color: #6fe3a0; }
      .mobile-nav a.active .mobile-nav__icon { background: rgba(17,152,74,.35); color: #6fe3a0; }
    }
  `]
})
export class MobileNavComponent {
  readonly language = inject(LanguageService);
  private readonly auth = inject(AuthService);

  readonly items = [
    { route: '/', en: 'Home', hi: 'होम', icon: '⌂' },
    { route: '/about', en: 'About', hi: 'अबाउट', icon: 'ⓘ' },
    { route: '/causes', en: 'Our Work', hi: 'कार्य', icon: '⌁' },
    { route: '/donate', en: 'Donate', hi: 'दान', icon: '＋' },
    { route: '/impact', en: 'Impact', hi: 'प्रभाव', icon: '◉' },
    { route: '/contact', en: 'Contact', hi: 'संपर्क', icon: '☎' },
  ];

  readonly visibleItems = computed(() =>
    this.auth.isAuthenticated() ? this.items : this.items.filter((item) => item.route !== '/impact')
  );
}
