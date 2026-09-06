import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { FeatureCardComponent } from '../../shared/ui/feature-card.component';
import { causes as causeData } from '../../core/site-data';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-causes-page',
  standalone: true,
  imports: [NgFor, PageHeroComponent, FeatureCardComponent],
  template: `
    <app-page-hero
      eyebrow="Our Work / हमारे काम"
      title="Our Work"
      subtitle="Clean, focused initiatives that create practical change in education, healthcare and community life."
      imageUrl="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1400&q=80"
    />

    <section class="section">
      <div class="section__head">
        <div>
          <p class="section__eyebrow">Our Key Areas of Impact</p>
          <h2 class="section__title">Focused causes with long-term support</h2>
          <p class="section__subtitle">Each initiative is designed to feel tangible, local and easy to support.</p>
        </div>
      </div>

      <div class="causes-grid">
        @for (cause of causes; track cause.title) {
          <app-feature-card
            [title]="cause.title"
            [description]="cause.description"
            [imageUrl]="cause.imageUrl"
            [route]="cause.route"
            [iconPath]="cause.iconPath"
            [ctaLabel]="cause.ctaLabel || 'Learn More'"
          ></app-feature-card>
        }
      </div>
    </section>
  `,
  styles: [`
    .causes-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    @media (max-width: 720px) { .causes-grid { grid-template-columns: 1fr; } }
  `]
})
export class CausesPageComponent {
  readonly causes = causeData;

  constructor(private readonly seo: SeoService) {
    this.seo.setPage('Our Work', 'Explore our nonprofit causes across education, healthcare, women and child welfare, and community support.');
  }
}
