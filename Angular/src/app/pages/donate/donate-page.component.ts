import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { DonationService } from '../../core/services/donation.service';
import { SeoService } from '../../core/services/seo.service';

interface RazorpayOrder {
  orderId: string;
  amount: number;
  currency: string;
  razorpayKeyId: string;
  donationId: number;
  receipt: string;
}

@Component({
  selector: 'app-donate-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Donate Now / दान करें"
      title="Donate Now"
      subtitle="Your contribution can change a life. Secure payments through UPI, cards, net banking and wallets."
      imageUrl="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1400&q=80"
    />

    <section class="section donate">
      <div class="donate__layout">
        <form class="surface donate__panel" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="section__head">
            <div>
              <p class="section__eyebrow">Select Amount</p>
              <h2 class="section__title">Choose how you want to support</h2>
            </div>
          </div>

          <label class="field">
            <span>Donation Amount</span>
            <input type="number" min="100" step="1" formControlName="amount" placeholder="Enter the amount you wish to donate">
          </label>

          <div class="donate__note">Minimum donation: ₹100. Custom amounts will override preset values.</div>

          <div class="section__head section__head--compact">
            <div>
              <p class="section__eyebrow">Donor Details</p>
              <h3 class="section__title">Please share your details</h3>
            </div>
          </div>

          <label class="field">
            <span>Full Name *</span>
            <input type="text" formControlName="donor_name" placeholder="Enter full name">
          </label>
          <label class="field">
            <span>Mobile Number *</span>
            <input type="tel" formControlName="mobile" placeholder="Enter mobile number">
          </label>
          <label class="field">
            <span>Email Address</span>
            <input type="email" formControlName="email" placeholder="Enter email address">
          </label>
          <label class="field">
            <span>Address *</span>
            <textarea formControlName="address" rows="3" placeholder="Enter your address"></textarea>
          </label>

          <button class="btn btn-primary donate__cta" type="submit" [disabled]="loading">
            {{ loading ? 'Preparing Razorpay...' : 'Proceed to Pay' }}
          </button>

          <p class="donate__security">100% Secure Payments. We verify every transaction server-side before recording it.</p>
          <p class="donate__error" *ngIf="error">{{ error }}</p>
        </form>

        <aside class="surface donate__sidebar">
          <div class="trust-badge">
            <span class="trust-badge__icon">✓</span>
            <div>
              <strong>Trusted checkout</strong>
              <p>Razorpay powered payments with server-side verification.</p>
            </div>
          </div>

          <div class="payment-methods">
            <h3>We Accept Multiple Payment Methods</h3>
            <div class="payment-methods__row">
              <span>UPI</span>
              <span>Cards</span>
              <span>Net Banking</span>
              <span>Wallets</span>
            </div>
            <div class="razorpay-brand">
              <strong>Razorpay</strong>
              <span>Powered by Razorpay</span>
            </div>
          </div>

          <div class="security-box">
            <h3>Why this is secure</h3>
            <ul>
              <li>Order created on Laravel backend</li>
              <li>Payment signature verified on server</li>
              <li>Webhook handled for duplicate safety</li>
              <li>No secret keys exposed to Angular</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .donate__layout { display: grid; grid-template-columns: 1.1fr .9fr; gap: 20px; align-items: start; }
    .donate__panel, .donate__sidebar { padding: 24px; }
    .donate__panel { display: grid; gap: 16px; }
    .donate__head { margin-bottom: 8px; }
    .donate__head h2 { margin: 0; }
    .amount-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
    .amount-chip { height: 54px; border-radius: 16px; border: 1px solid rgba(23,50,95,.12); background: #f7fbff; color: var(--navy-2); font-weight: 800; cursor: pointer; }
    .amount-chip--active { background: linear-gradient(135deg, #14aa53, #0f863f); color: white; border-color: transparent; }
    .field { display: grid; gap: 8px; }
    .field span { font-weight: 800; color: var(--navy-2); }
    .field input, .field textarea { width: 100%; min-height: 50px; border-radius: 14px; border: 1px solid rgba(23,50,95,.12); padding: 12px 14px; font: inherit; background: #fff; resize: vertical; }
    .field input:focus, .field textarea:focus { outline: 2px solid rgba(17,152,74,.18); border-color: rgba(17,152,74,.5); }
    .donate__note, .donate__security, .donate__error { margin: 0; color: var(--muted); line-height: 1.6; }
    .donate__error { color: #b42318; font-weight: 700; }
    .donate__cta { width: 100%; min-height: 52px; }
    .donate__sidebar { display: grid; gap: 18px; position: sticky; top: 104px; }
    .trust-badge { display: flex; gap: 14px; align-items: start; padding: 18px; background: #f4fbf6; border-radius: 22px; border: 1px solid rgba(17,152,74,.12); }
    .trust-badge__icon { width: 40px; height: 40px; border-radius: 50%; background: #14aa53; color: white; display: grid; place-items: center; font-weight: 900; }
    .trust-badge p, .payment-methods span, .security-box li { color: var(--muted); }
    .payment-methods h3, .security-box h3 { margin: 0 0 12px; color: var(--navy-2); }
    .payment-methods__row { display: flex; flex-wrap: wrap; gap: 10px; }
    .payment-methods__row span { padding: 10px 14px; border-radius: 999px; background: #f3f8fd; border: 1px solid rgba(101,132,168,.14); font-weight: 700; }
    .razorpay-brand { margin-top: 12px; padding: 16px; border-radius: 18px; background: linear-gradient(135deg, #f7fbff, #eef6ff); border: 1px solid rgba(101,132,168,.12); }
    .razorpay-brand strong { display: block; color: var(--navy-2); font-size: 1.1rem; }
    .security-box ul { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
    .section__head--compact { margin-bottom: 0; }
    @media (max-width: 980px) {
      .donate__layout { grid-template-columns: 1fr; }
      .donate__sidebar { position: static; }
    }
    @media (max-width: 720px) {
      .amount-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .donate__panel, .donate__sidebar { padding: 18px; }
    }
  `]
})
export class DonatePageComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly donationService = inject(DonationService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  private readonly sub = new Subscription();

  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    donor_name: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.email]],
    address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    amount: [0, [Validators.required, Validators.min(100)]],
  });

  ngOnInit(): void {
    this.seo.setPage('Donate Now', 'Secure donations for Bharat Foundation Trust using Razorpay checkout and server-side verification.');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please fill the required donor details and a valid amount.';
      return;
    }

    this.loading = true;
    const formValue = this.form.getRawValue();
    const amount = Number(formValue.amount);

    const createSub = this.donationService.createOrder({
      donor_name: formValue.donor_name,
      mobile: formValue.mobile,
      email: formValue.email,
      address: formValue.address,
      amount,
    }).subscribe({
      next: async (response) => {
        this.loading = false;
        await this.openCheckout(response.data, {
          donor_name: formValue.donor_name,
          mobile: formValue.mobile,
          email: formValue.email,
          address: formValue.address,
          amount,
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Unable to prepare Razorpay checkout. Please try again in a moment.';
      },
    });

    this.sub.add(createSub);
  }

  private async openCheckout(order: RazorpayOrder, formValue: { donor_name: string; mobile: string; email: string; address: string; amount: number }): Promise<void> {
    const loaded = await this.loadRazorpayScript();
    if (!loaded) {
      this.error = 'Razorpay checkout script could not be loaded.';
      return;
    }

    const razorpay = new (window as any).Razorpay({
      key: order.razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      name: 'Bharat Foundation Trust',
      description: 'Trust Donation',
      order_id: order.orderId,
      prefill: {
        name: formValue.donor_name,
        contact: formValue.mobile,
        email: formValue.email,
      },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
      theme: {
        color: '#0f7b38',
      },
      modal: {
        ondismiss: () => {
          void this.router.navigate(['/payment/failure']);
        },
      },
      handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; method?: string }) => {
        this.verifyPayment(order.donationId, response);
      },
    });

    razorpay.open();
  }

  private verifyPayment(
    donationId: number,
    response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; method?: string }
  ): void {
    const verifySub = this.donationService.verifyPayment({
      donationId,
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      signature: response.razorpay_signature,
      paymentMethod: response.method,
    }).subscribe({
      next: () => void this.router.navigate(['/payment/success']),
      error: () => void this.router.navigate(['/payment/failure']),
    });

    this.sub.add(verifySub);
  }

  private loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const existing = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true), { once: true });
        existing.addEventListener('error', () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }
}
