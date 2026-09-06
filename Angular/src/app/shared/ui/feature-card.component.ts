import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="feature-card">
      <div class="feature-card__image" [style.background-image]="'url(' + imageUrl + ')'">
        <div class="feature-card__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path [attr.d]="iconPath"></path>
          </svg>
        </div>
      </div>
      <div class="feature-card__body">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <a class="feature-card__link" [routerLink]="route">{{ ctaLabel || 'Learn More' }} <span>→</span></a>
      </div>
    </article>
  `,
  styles: [`
    .feature-card { background: rgba(255,255,255,.95); border-radius: 24px; overflow: hidden; box-shadow: 0 16px 35px rgba(7, 34, 69, .08); border: 1px solid rgba(101, 132, 168, .13); height: 100%; }
    .feature-card__image { min-height: 175px; background-size: cover; background-position: center; position: relative; }
    .feature-card__image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(4,20,45,.08), rgba(4,20,45,.36)); }
    .feature-card__icon { position: absolute; left: 18px; top: 18px; z-index: 1; width: 46px; height: 46px; border-radius: 16px; display: grid; place-items: center; background: rgba(255,255,255,.92); color: #0f7b38; box-shadow: 0 10px 24px rgba(0,0,0,.16); }
    .feature-card__icon svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .feature-card__body { padding: 20px; display: grid; gap: 10px; }
    .feature-card__body h3 { margin: 0; color: #17325f; font-size: 1.15rem; }
    .feature-card__body p { margin: 0; color: #5a6f88; line-height: 1.6; font-size: 1rem; }
    .feature-card__link { color: #1959b6; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
    .feature-card__link span { transition: transform .2s ease; }
    .feature-card__link:hover span { transform: translateX(2px); }
  `]
})
export class FeatureCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() imageUrl = '';
  @Input() route = '/';
  @Input() iconPath = '';
  @Input() ctaLabel = 'Learn More';
}
