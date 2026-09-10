import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { TrusteeCardComponent } from '../../shared/ui/trustee-card.component';
import { trustees as trusteeData } from '../../core/site-data';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [NgFor, RouterLink, PageHeroComponent, TrusteeCardComponent],
  template: `
    <app-page-hero
      title="A responsible step toward service, support, and positive change."
      subtitle="A transparent trust working on education, healthcare, women & child welfare, and community support."
      imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
    />

    <section class="section story">
      <div class="section__head">
        <div>
          <p class="section__eyebrow">Our Story / हमारी कहानी</p>
          <h2 class="section__title">Working with trust, care and accountability</h2>
        </div>
      </div>

      <div class="story__grid surface">
        <div class="story__text">
          <p class="story__lead">Bharat Foundation Trust's purpose is to bring support and opportunities to those in society who need it most.</p>
          <p class="story__note">The trust works through <strong class="story__accent">education, healthcare, skill development and social support</strong> to bring about positive change.</p>
          <p class="story__lead">Our approach keeps donations transparent, programs focused and beneficiaries at the center of every decision.</p>
          <p class="story__note">We work with <strong class="story__accent">volunteers, local partners</strong> and donors who want to see transparent outcomes.</p>
          <a class="btn btn-primary" routerLink="/donate">Donate Now</a>
        </div>
        <img class="story__image" src="assets/about-poster.png" alt="Bharat Foundation Trust - सेवा, संवेदना, सशक्त समाज" />
      </div>
    </section>

    <section class="section">
      <div class="values-grid">
        <article class="value-card surface">
          <div class="value-card__icon">01</div>
          <h3>Our Mission</h3>
          <p>To empower individuals and communities through education, healthcare and support.</p>
        </article>
        <article class="value-card surface">
          <div class="value-card__icon">02</div>
          <h3>Our Vision</h3>
          <p>A society where every individual has equal opportunities to live a dignified life.</p>
        </article>
        <article class="value-card surface">
          <div class="value-card__icon">03</div>
          <h3>Our Values</h3>
          <p>Compassion, transparency, integrity and community participation guide our work.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section__head">
        <div>
          <p class="section__eyebrow">Meet Our Trustees</p>
          <h2 class="section__title">The people guiding the trust</h2>
        </div>
      </div>
      <div class="trustees-grid">
        @for (trustee of trustees; track trustee.name) {
          <app-trustee-card [name]="trustee.name" [designation]="trustee.designation" [imageUrl]="trustee.imageUrl"></app-trustee-card>
        }
      </div>
    </section>
  `,
  styles: [`
    .story__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 24px; }
    .story__text { display: flex; flex-direction: column; gap: 14px; padding: 12px; }
    .story__text p { margin: 0; color: var(--muted); line-height: 1.75; font-size: 1.05rem; }
    .story__lead { color: var(--navy-2); font-weight: 700; font-size: 1.18rem; }
    .story__note { font-size: 1rem; }
    .story__accent { color: #0f7b38; font-weight: 700; }
    .story__image { width: 100%; aspect-ratio: 3 / 2; border-radius: 24px; object-fit: contain; background: #fff; align-self: center; }
    .values-grid, .trustees-grid { display: grid; gap: 18px; }
    .values-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .trustees-grid { grid-template-columns: minmax(0, 300px); justify-content: center; }
    .value-card { padding: 24px; display: grid; gap: 12px; }
    .value-card__icon { width: 46px; height: 46px; border-radius: 16px; display: grid; place-items: center; background: #e8f7ef; color: #0f7b38; font-weight: 900; }
    .value-card h3 { margin: 0; color: var(--navy-2); }
    .value-card p { margin: 0; color: var(--muted); line-height: 1.65; font-size: 1.05rem; }
    @media (max-width: 1100px) {
      .story__grid, .values-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 720px) {
      .story__grid, .values-grid { grid-template-columns: 1fr; }
      .story__grid { padding: 18px; }
    }
  `]
})
export class AboutPageComponent {
  readonly trustees = trusteeData;

  constructor(private readonly seo: SeoService) {
    this.seo.setPage('About Us', 'Learn about the trust story, mission, vision, values and trustees behind the organization.');
  }
}
