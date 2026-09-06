import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <section class="page-hero">
      <div class="page-hero__overlay"></div>
      <div class="page-hero__content">
        <p class="page-hero__eyebrow" *ngIf="eyebrow">{{ eyebrow }}</p>
        <h1>{{ title }}</h1>
        <p class="page-hero__subtitle">{{ subtitle }}</p>
        <div class="page-hero__actions" *ngIf="primaryLabel || secondaryLabel">
          <a *ngIf="primaryLabel" class="btn btn-primary" [routerLink]="primaryRoute">{{ primaryLabel }}</a>
          <a *ngIf="secondaryLabel" class="btn btn-secondary" [routerLink]="secondaryRoute">{{ secondaryLabel }}</a>
        </div>
      </div>
      <div class="page-hero__image" [style.background-image]="'url(' + imageUrl + ')'"></div>
    </section>
  `,
  styles: [`
    .page-hero { position: relative; min-height: 280px; border-radius: 28px; overflow: hidden; display: grid; grid-template-columns: 1.1fr 0.9fr; background: linear-gradient(135deg, rgba(8,32,73,.96), rgba(15,88,51,.82)); color: #fff; box-shadow: 0 20px 50px rgba(16, 52, 106, 0.18); }
    .page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(4,21,48,.92) 0%, rgba(4,21,48,.70) 42%, rgba(4,21,48,.15) 100%); z-index: 1; }
    .page-hero__content { position: relative; z-index: 2; padding: 44px; display: flex; flex-direction: column; justify-content: center; gap: 12px; }
    .page-hero__eyebrow { margin: 0; text-transform: uppercase; letter-spacing: .18em; font-size: .78rem; color: rgba(255,255,255,.75); }
    .page-hero h1 { margin: 0; font-size: clamp(2rem, 4vw, 3.7rem); line-height: 1.02; }
    .page-hero__subtitle { margin: 0; max-width: 52ch; color: rgba(255,255,255,.84); font-size: 1.02rem; }
    .page-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
    .page-hero__image { min-height: 280px; background-size: cover; background-position: center; }
    @media (max-width: 900px) { .page-hero { grid-template-columns: 1fr; } .page-hero__content { padding: 28px; } .page-hero__image { min-height: 210px; } }
  `]
})
export class PageHeroComponent {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() imageUrl = '';
  @Input() primaryLabel = '';
  @Input() primaryRoute = '/';
  @Input() secondaryLabel = '';
  @Input() secondaryRoute = '/';
}
