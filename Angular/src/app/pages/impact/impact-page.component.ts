import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { PublicApiService } from '../../core/services/api.service';
import { DonationSummary } from '../../core/models';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-impact-page',
  standalone: true,
  imports: [NgFor, CurrencyPipe, DatePipe, PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Donation / Impact"
      title="Donation / Impact"
      subtitle="See the outcome of your support in a public, transparent way."
      imageUrl="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1400&q=80"
    />

    <section class="section">
      <div class="stats-grid">
        <article class="surface impact-card" *ngFor="let card of summaryCards">
          <p class="impact-card__label">{{ card.label }}</p>
          <strong class="impact-card__value">{{ card.value }}</strong>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section__head">
        <div>
          <p class="section__eyebrow">Recent Successful Donations</p>
          <h2 class="section__title">Public impact snapshot</h2>
          <p class="section__subtitle">Only masked donor names and safe public data are shown here.</p>
        </div>
      </div>

      <div class="surface impact-list">
        <article *ngFor="let donation of publicDonations" class="impact-row">
          <span>{{ donation.name }}</span>
          <strong>{{ donation.amount | currency:'INR':'symbol-narrow':'1.0-0' }}</strong>
          <small>{{ donation.createdAt | date:'dd MMM yyyy' }}</small>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
    .impact-card { padding: 24px; display: grid; gap: 8px; }
    .impact-card__label { margin: 0; color: var(--muted); font-weight: 700; }
    .impact-card__value { color: var(--green-dark); font-size: 1.6rem; }
    .impact-list { padding: 10px 18px; }
    .impact-row { display: grid; grid-template-columns: 1fr auto auto; gap: 16px; align-items: center; padding: 16px 10px; border-bottom: 1px solid rgba(101,132,168,.12); }
    .impact-row:last-child { border-bottom: 0; }
    .impact-row span { font-weight: 800; color: var(--navy-2); }
    .impact-row strong { color: var(--green-dark); }
    .impact-row small { color: var(--muted); }
    @media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 720px) {
      .stats-grid { grid-template-columns: 1fr; }
      .impact-row { grid-template-columns: 1fr; gap: 6px; }
    }
  `]
})
export class ImpactPageComponent implements OnInit {
  private readonly api = inject(PublicApiService);
  private readonly seo = inject(SeoService);

  summaryCards = [
    { label: 'Total Donations', value: '—' },
    { label: 'Total Donors', value: '—' },
    { label: 'Successful Payments', value: '—' },
    { label: 'Beneficiaries Helped', value: '—' },
  ];

  publicDonations: { name: string; amount: number; createdAt: string }[] = [];

  ngOnInit(): void {
    this.seo.setPage('Donation Impact', 'View public impact and transparent donation highlights for Bharat Foundation Trust.');
    this.api.impact().subscribe({
      next: (response) => {
        const data: DonationSummary = response.data;
        this.summaryCards = [
          { label: 'Total Donations', value: `₹${data.totalDonations.toLocaleString('en-IN')}` },
          { label: 'Total Donors', value: `${data.totalDonors.toLocaleString('en-IN')}+` },
          { label: 'Successful Payments', value: `${data.successfulPayments.toLocaleString('en-IN')}+` },
          { label: 'Beneficiaries Helped', value: `${data.beneficiariesHelped.toLocaleString('en-IN')}+` },
        ];
        this.publicDonations = data.recentPublicDonations;
      },
      error: () => undefined,
    });
  }
}
