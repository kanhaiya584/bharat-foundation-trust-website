import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DonationService } from '../../core/services/donation.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-payment-success-page',
  standalone: true,
  imports: [NgIf, RouterLink, DatePipe, DecimalPipe],
  template: `
    <section class="result surface">
      <div class="result__icon result__icon--success">✓</div>
      <h1>Donation Successful</h1>
      <p class="result__subtitle">Thank you for supporting our cause.</p>

      <div class="receipt" *ngIf="receipt as donation">
        <div><span>Donor Name</span><strong>{{ donation.donorName }}</strong></div>
        <div><span>Amount</span><strong>₹{{ donation.amount | number:'1.0-0' }}</strong></div>
        <div><span>Payment ID</span><strong>{{ donation.paymentId || '—' }}</strong></div>
        <div><span>Date</span><strong>{{ donation.createdAt | date:'dd MMM yyyy, h:mm a' }}</strong></div>
        <div><span>Payment Method</span><strong>{{ donation.paymentMethod || 'Razorpay' }}</strong></div>
      </div>

      <div class="result__actions">
        <button class="btn btn-primary" type="button" (click)="downloadReceipt()">Download Receipt</button>
        <a class="btn btn-secondary" routerLink="/">Back to Home</a>
      </div>
    </section>
  `,
  styles: [`
    .result { max-width: 760px; margin: 0 auto; padding: 34px; text-align: center; display: grid; gap: 16px; }
    .result__icon { width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; margin: 0 auto; font-size: 2.2rem; font-weight: 900; }
    .result__icon--success { background: #e7f8ee; color: #0f7b38; }
    .result h1 { margin: 0; font-size: clamp(2rem, 4vw, 3rem); }
    .result__subtitle { margin: 0; color: var(--muted); }
    .receipt { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; text-align: left; margin-top: 8px; }
    .receipt div { padding: 16px; border-radius: 18px; background: #f7fbff; border: 1px solid rgba(101,132,168,.12); }
    .receipt span { display: block; color: var(--muted); font-size: .9rem; margin-bottom: 6px; }
    .receipt strong { color: var(--navy-2); }
    .result__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
    @media (max-width: 720px) { .result { padding: 20px; } .receipt { grid-template-columns: 1fr; } }
  `]
})
export class PaymentSuccessPageComponent {
  private readonly donationService = inject(DonationService);
  private readonly seo = inject(SeoService);

  receipt = this.donationService.receipt();

  constructor() {
    this.seo.setPage('Donation Successful', 'Thank you for your verified contribution to Bharat Foundation Trust.');
  }

  downloadReceipt(): void {
    const donation = this.receipt;
    if (!donation) return;
    const content = [
      'Bharat Foundation Trust',
      'Donation Receipt',
      `Donor: ${donation.donorName}`,
      `Amount: ₹${donation.amount}`,
      `Payment ID: ${donation.paymentId || 'N/A'}`,
      `Date: ${donation.createdAt}`,
      `Payment Method: ${donation.paymentMethod || 'Razorpay'}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'donation-receipt.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
