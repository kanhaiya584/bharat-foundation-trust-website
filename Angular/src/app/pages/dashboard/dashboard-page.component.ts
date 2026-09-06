import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DashboardApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardDonation, DashboardSummary } from '../../core/models';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe, DatePipe],
  template: `
    <section class="section">
      <div class="dashboard-head">
        <div>
          <p class="section__eyebrow">Dashboard</p>
          <h1 class="section__title">Recent Donations</h1>
          <p class="section__subtitle">A simple donation dashboard for authorized trust personnel.</p>
        </div>
        <a class="btn btn-secondary" routerLink="/donate">Open Public Donate Page</a>
      </div>

      <div class="summary-grid">
        <article class="surface summary-card" *ngFor="let card of summaryCards">
          <span>{{ card.label }}</span>
          <strong>{{ card.value }}</strong>
        </article>
      </div>

      <form class="surface filters" [formGroup]="filters" (ngSubmit)="applyFilters()">
        <label class="filter"><span>Search</span><input formControlName="search" placeholder="Name, email, payment ID"></label>
        <label class="filter"><span>Status</span>
          <select formControlName="status">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </label>
        <label class="filter"><span>Amount Min</span><input formControlName="amount_min" type="number"></label>
        <label class="filter"><span>Amount Max</span><input formControlName="amount_max" type="number"></label>
        <label class="filter"><span>From</span><input formControlName="from_date" type="date"></label>
        <label class="filter"><span>To</span><input formControlName="to_date" type="date"></label>
        <div class="filters__actions">
          <button class="btn btn-primary" type="submit">Apply Filters</button>
          <button class="btn btn-secondary" type="button" (click)="resetFilters()">Reset</button>
          <button class="btn btn-secondary" type="button" (click)="exportCsv()">Export CSV</button>
          <button class="btn btn-secondary" type="button" (click)="logout()">Logout</button>
        </div>
      </form>

      <section class="surface table-wrap">
        <table class="donation-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Donor Name</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let donation of donations">
              <td>{{ donation.createdAt | date:'dd MMM yyyy' }}</td>
              <td>{{ donation.donorName }}</td>
              <td>{{ donation.amount | currency:donation.currency:'symbol-narrow':'1.0-0' }}</td>
              <td>{{ donation.paymentMethod || '—' }}</td>
              <td>{{ donation.paymentId || '—' }}</td>
              <td><span class="status status--{{ donation.status }}">{{ statusLabel(donation.status) }}</span></td>
            </tr>
          </tbody>
        </table>

        <div class="mobile-cards">
          <article class="mobile-card" *ngFor="let donation of donations">
            <div class="mobile-card__top">
              <strong>{{ donation.donorName }}</strong>
              <span class="status status--{{ donation.status }}">{{ statusLabel(donation.status) }}</span>
            </div>
            <p>{{ donation.createdAt | date:'dd MMM yyyy' }} · {{ donation.amount | currency:donation.currency:'symbol-narrow':'1.0-0' }}</p>
            <p>Method: {{ donation.paymentMethod || '—' }}</p>
            <p>Payment ID: {{ donation.paymentId || '—' }}</p>
          </article>
        </div>
      </section>

      <div class="pagination">
        <button class="btn btn-secondary" type="button" (click)="previousPage()" [disabled]="page <= 1">Prev</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button class="btn btn-secondary" type="button" (click)="nextPage()" [disabled]="page >= totalPages">Next</button>
      </div>
    </section>
  `,
  styles: [`
    .dashboard-head { display: flex; justify-content: space-between; gap: 18px; align-items: end; margin-bottom: 18px; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 18px; }
    .summary-card { padding: 20px; display: grid; gap: 8px; }
    .summary-card span { color: var(--muted); font-weight: 700; }
    .summary-card strong { color: var(--navy-2); font-size: 1.5rem; }
    .filters { padding: 18px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-bottom: 18px; }
    .filter { display: grid; gap: 8px; }
    .filter span { font-weight: 800; color: var(--navy-2); }
    .filter input, .filter select { min-height: 48px; border-radius: 14px; border: 1px solid rgba(23,50,95,.12); padding: 0 14px; font: inherit; }
    .filters__actions { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 10px; }
    .table-wrap { padding: 10px 16px 16px; }
    .donation-table { width: 100%; border-collapse: collapse; }
    .donation-table th, .donation-table td { padding: 14px 10px; text-align: left; border-bottom: 1px solid rgba(101,132,168,.12); }
    .donation-table th { color: var(--navy-2); font-size: .9rem; text-transform: uppercase; letter-spacing: .08em; }
    .status { display: inline-flex; align-items: center; padding: 8px 12px; border-radius: 999px; font-size: .82rem; font-weight: 800; }
    .status--success { background: #e7f8ee; color: #0f7b38; }
    .status--pending { background: #eef6ff; color: #1d5fbf; }
    .status--failed { background: #fff0f0; color: #c21d18; }
    .status--refunded { background: #f0ecff; color: #5b3ecf; }
    .mobile-cards { display: none; gap: 12px; }
    .mobile-card { padding: 14px; border: 1px solid rgba(101,132,168,.12); border-radius: 18px; background: #fff; }
    .mobile-card__top { display: flex; justify-content: space-between; gap: 10px; align-items: start; }
    .mobile-card p { margin: 8px 0 0; color: var(--muted); }
    .pagination { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 14px; }
    @media (max-width: 1100px) {
      .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 720px) {
      .dashboard-head { flex-direction: column; align-items: start; }
      .summary-grid, .filters { grid-template-columns: 1fr; }
      .donation-table { display: none; }
      .mobile-cards { display: grid; }
    }
  `]
})
export class DashboardPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(DashboardApiService);
  private readonly auth = inject(AuthService);
  private readonly seo = inject(SeoService);

  summaryCards = [
    { label: 'Total Donations', value: '₹0' },
    { label: 'Total Donors', value: '0' },
    { label: 'Successful Payments', value: '0' },
    { label: 'Failed Payments', value: '0' },
  ];

  donations: DashboardDonation[] = [];
  page = 1;
  totalPages = 1;

  filters = this.fb.nonNullable.group({
    search: [''],
    status: [''],
    amount_min: [''],
    amount_max: [''],
    from_date: [''],
    to_date: [''],
  });

  ngOnInit(): void {
    this.seo.setPage('Dashboard', 'Authorized donation dashboard with recent donations and filters.');
    this.loadSummary();
    this.loadDonations();
  }

  loadSummary(): void {
    this.api.summary().subscribe({
      next: (response) => {
        const summary: DashboardSummary = response.data;
        this.summaryCards = [
          { label: 'Total Donations', value: `₹${summary.totalDonations.toLocaleString('en-IN')}` },
          { label: 'Total Donors', value: summary.totalDonors.toLocaleString('en-IN') },
          { label: 'Successful Payments', value: summary.successfulPayments.toLocaleString('en-IN') },
          { label: 'Failed Payments', value: summary.failedPayments.toLocaleString('en-IN') },
        ];
      },
      error: () => undefined,
    });
  }

  loadDonations(): void {
    const params = this.buildQuery();
    this.api.donations(params).subscribe({
      next: (response) => {
        this.donations = response.data.data;
        this.totalPages = response.data.meta.last_page || 1;
        this.page = response.data.meta.current_page || 1;
      },
      error: () => {
        this.donations = [
          { id: 1, donorName: 'Rahul Sharma', mobile: 'XXXXXXXXXX', email: 'rahul@example.com', amount: 1000, currency: 'INR', paymentMethod: 'UPI', paymentId: 'pay_demo_1', status: 'success', createdAt: new Date().toISOString() },
          { id: 2, donorName: 'Priya Singh', mobile: 'XXXXXXXXXX', email: 'priya@example.com', amount: 2500, currency: 'INR', paymentMethod: 'Card', paymentId: 'pay_demo_2', status: 'pending', createdAt: new Date().toISOString() },
        ];
        this.totalPages = 1;
        this.page = 1;
      },
    });
  }

  applyFilters(): void {
    this.page = 1;
    this.loadDonations();
  }

  resetFilters(): void {
    this.filters.reset({
      search: '',
      status: '',
      amount_min: '',
      amount_max: '',
      from_date: '',
      to_date: '',
    });
    this.page = 1;
    this.loadDonations();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.loadDonations();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.loadDonations();
    }
  }

  exportCsv(): void {
    const params = this.buildQuery();
    this.api.exportCsv(params).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'donations.csv';
        anchor.click();
        URL.revokeObjectURL(url);
      },
      error: () => undefined,
    });
  }

  logout(): void {
    this.auth.logout().subscribe();
  }

  statusLabel(status: DashboardDonation['status']): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  private buildQuery(): string {
    const value = this.filters.getRawValue();
    const params = new URLSearchParams();
    params.set('page', String(this.page));
    Object.entries(value).forEach(([key, raw]) => {
      const val = String(raw || '').trim();
      if (val) {
        params.set(key, val);
      }
    });
    const query = params.toString();
    return query ? `?${query}` : '';
  }
}
