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
          <h2 class="donate__heading">Choose Payment Method</h2>

          <div class="pay-methods">
            <button type="button" class="pay-method" [class.pay-method--active]="selectedMethod === 'online'" (click)="selectedMethod = 'online'">
              <span class="pay-method__check" *ngIf="selectedMethod === 'online'">✓</span>
              <span class="pay-method__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"></rect><path d="M2 10h20"></path></svg>
              </span>
              <strong>Online</strong>
              <small>Card, Net Banking &amp; Wallets</small>
            </button>
            <button type="button" class="pay-method" [class.pay-method--active]="selectedMethod === 'upi'" (click)="selectedMethod = 'upi'">
              <span class="pay-method__check" *ngIf="selectedMethod === 'upi'">✓</span>
              <span class="pay-method__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13l-3-3M20 16H7l3 3"></path></svg>
              </span>
              <strong>UPI</strong>
              <small>Pay using any UPI app</small>
            </button>
            <button type="button" class="pay-method" [class.pay-method--active]="selectedMethod === 'qr'" (click)="selectedMethod = 'qr'">
              <span class="pay-method__check" *ngIf="selectedMethod === 'qr'">✓</span>
              <span class="pay-method__icon">
                <svg class="qr-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="3" height="3"></rect>
                  <rect x="18" y="14" width="3" height="3"></rect>
                  <rect x="14" y="18" width="3" height="3"></rect>
                  <rect x="18" y="18" width="3" height="3"></rect>
                </svg>
              </span>
              <strong>QR Code</strong>
              <small>Scan &amp; pay instantly</small>
            </button>
            <button type="button" class="pay-method" [class.pay-method--active]="selectedMethod === 'bank'" (click)="selectedMethod = 'bank'">
              <span class="pay-method__check" *ngIf="selectedMethod === 'bank'">✓</span>
              <span class="pay-method__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10l9-6 9 6M4 10v9M20 10v9M8 10v9M16 10v9M2 21h20"></path></svg>
              </span>
              <strong>Bank Transfer</strong>
              <small>Secure &amp; direct bank transfer</small>
            </button>
          </div>

          <div class="pay-details" *ngIf="selectedMethod === 'upi'">
            <div class="pay-details__upi">
              <div>
                <span class="pay-details__label">UPI ID</span>
                <strong>bharatfoundationtrust&#64;upi</strong>
              </div>
              <button type="button" class="btn btn-secondary pay-details__copy" (click)="copyUpiId()">{{ upiCopied ? 'Copied!' : 'Copy' }}</button>
            </div>
            <p class="pay-details__hint">Copy this UPI ID and pay using any UPI app (Google Pay, PhonePe, Paytm etc.)</p>
          </div>

          <div class="pay-details" *ngIf="selectedMethod === 'qr'">
            <div class="pay-details__qr">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <rect width="100" height="100" fill="#ffffff"></rect>
                <g fill="#0f172a">
                  <rect x="4" y="4" width="22" height="22"></rect>
                  <rect x="74" y="4" width="22" height="22"></rect>
                  <rect x="4" y="74" width="22" height="22"></rect>
                </g>
                <g fill="#ffffff">
                  <rect x="8" y="8" width="14" height="14"></rect>
                  <rect x="78" y="8" width="14" height="14"></rect>
                  <rect x="8" y="78" width="14" height="14"></rect>
                </g>
                <g fill="#0f172a">
                  <rect x="11" y="11" width="8" height="8"></rect>
                  <rect x="81" y="11" width="8" height="8"></rect>
                  <rect x="11" y="81" width="8" height="8"></rect>
                </g>
                <g fill="#0f172a">
                  <rect x="34" y="6" width="6" height="6"></rect>
                  <rect x="46" y="6" width="6" height="6"></rect>
                  <rect x="58" y="10" width="6" height="6"></rect>
                  <rect x="34" y="18" width="6" height="6"></rect>
                  <rect x="52" y="20" width="6" height="6"></rect>
                  <rect x="64" y="18" width="6" height="6"></rect>
                  <rect x="34" y="34" width="6" height="6"></rect>
                  <rect x="46" y="34" width="6" height="6"></rect>
                  <rect x="58" y="34" width="6" height="6"></rect>
                  <rect x="70" y="34" width="6" height="6"></rect>
                  <rect x="34" y="46" width="6" height="6"></rect>
                  <rect x="42" y="52" width="6" height="6"></rect>
                  <rect x="54" y="46" width="6" height="6"></rect>
                  <rect x="66" y="52" width="6" height="6"></rect>
                  <rect x="6" y="34" width="6" height="6"></rect>
                  <rect x="16" y="42" width="6" height="6"></rect>
                  <rect x="6" y="54" width="6" height="6"></rect>
                  <rect x="18" y="60" width="6" height="6"></rect>
                  <rect x="80" y="34" width="6" height="6"></rect>
                  <rect x="88" y="44" width="6" height="6"></rect>
                  <rect x="80" y="54" width="6" height="6"></rect>
                  <rect x="34" y="80" width="6" height="6"></rect>
                  <rect x="44" y="88" width="6" height="6"></rect>
                  <rect x="56" y="80" width="6" height="6"></rect>
                  <rect x="68" y="88" width="6" height="6"></rect>
                  <rect x="80" y="80" width="6" height="6"></rect>
                  <rect x="88" y="68" width="6" height="6"></rect>
                </g>
              </svg>
            </div>
            <p class="pay-details__hint">Scan this QR code with any UPI app to pay instantly.</p>
          </div>

          <div class="pay-details" *ngIf="selectedMethod === 'bank'">
            <div class="pay-details__bank">
              <div><span>Account Name</span><strong>Bharat Foundation Trust</strong></div>
              <div><span>Account Number</span><strong>1234567890123</strong></div>
              <div><span>IFSC Code</span><strong>SBIN0001234</strong></div>
              <div><span>Bank &amp; Branch</span><strong>State Bank of India, Kushinagar</strong></div>
            </div>
            <p class="pay-details__hint">Transfer the amount to this account and keep the reference number for your receipt.</p>
          </div>

          <hr class="donate__divider">

          <label class="field">
            <span>Donation Amount</span>
            <input type="number" min="100" step="1" formControlName="amount" placeholder="Enter the amount you wish to donate">
          </label>

          <div class="donate__note">Minimum donation: ₹100. Custom amounts will override preset values.</div>

          <hr class="donate__divider">

          <h3 class="donate__heading donate__heading--sm">Donor Details</h3>

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
              <span>Online</span>
              <span>UPI</span>
              <span>QR Code</span>
              <span>Bank Transfer</span>
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
    .donate__heading { margin: 0; color: var(--navy-2); font-size: 1.25rem; font-weight: 800; padding-left: 14px; border-left: 4px solid #14aa53; }
    .donate__heading--sm { font-size: 1.05rem; }
    .donate__divider { border: none; border-top: 1px solid rgba(23,50,95,.1); margin: 4px 0; }
    .amount-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
    .amount-chip { height: 54px; border-radius: 16px; border: 1px solid rgba(23,50,95,.12); background: #f7fbff; color: var(--navy-2); font-weight: 800; cursor: pointer; }
    .amount-chip--active { background: linear-gradient(135deg, #14aa53, #0f863f); color: white; border-color: transparent; }
    .pay-methods { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .pay-method { position: relative; display: grid; justify-items: center; align-content: start; gap: 8px; padding: 18px 10px; border-radius: 18px; border: 2px solid rgba(23,50,95,.12); background: #fff; cursor: pointer; text-align: center; font: inherit; color: var(--navy-2); transition: border-color .15s ease, background .15s ease; }
    .pay-method:hover { border-color: rgba(17,152,74,.4); }
    .pay-method--active { border-color: #14aa53; background: #f4fbf6; }
    .pay-method__icon { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: #f3f8fd; color: #1959b6; }
    .pay-method--active .pay-method__icon { background: #e5f7ec; color: #0f863f; }
    .pay-method__icon svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .pay-method__icon svg.qr-icon { fill: currentColor; stroke: none; }
    .pay-method strong { font-size: .92rem; }
    .pay-method small { color: var(--muted); font-size: .76rem; line-height: 1.3; }
    .pay-method__check { position: absolute; top: 8px; right: 8px; width: 20px; height: 20px; border-radius: 50%; background: #14aa53; color: #fff; display: grid; place-items: center; font-size: .68rem; font-weight: 900; }
    .pay-details { display: grid; gap: 10px; padding: 16px 18px; border-radius: 16px; background: #f7fbff; border: 1px solid rgba(101,132,168,.16); }
    .pay-details__hint { margin: 0; color: var(--muted); font-size: .88rem; line-height: 1.5; }
    .pay-details__upi { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
    .pay-details__label { display: block; color: var(--muted); font-size: .8rem; font-weight: 700; }
    .pay-details__upi strong { font-size: 1.05rem; color: var(--navy-2); }
    .pay-details__copy { min-height: 40px; padding: 0 18px; white-space: nowrap; }
    .pay-details__qr { display: grid; justify-items: center; }
    .pay-details__qr svg { width: 160px; height: 160px; border-radius: 14px; border: 1px solid rgba(23,50,95,.12); background: #fff; padding: 10px; }
    .pay-details__bank { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 20px; }
    .pay-details__bank span { display: block; color: var(--muted); font-size: .8rem; font-weight: 700; }
    .pay-details__bank strong { color: var(--navy-2); }
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
    @media (max-width: 980px) {
      .donate__layout { grid-template-columns: 1fr; }
      .donate__sidebar { position: static; }
      .pay-methods { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 720px) {
      .amount-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .donate__panel, .donate__sidebar { padding: 18px; }
      .pay-method { padding: 14px 8px; }
      .pay-method__icon { width: 38px; height: 38px; }
      .pay-method__icon svg { width: 20px; height: 20px; }
      .pay-details__bank { grid-template-columns: 1fr; }
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
  selectedMethod: 'online' | 'upi' | 'qr' | 'bank' = 'online';
  upiCopied = false;
  private readonly upiId = 'bharatfoundationtrust@upi';

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

  copyUpiId(): void {
    navigator.clipboard.writeText(this.upiId).then(() => {
      this.upiCopied = true;
      setTimeout(() => (this.upiCopied = false), 1500);
    });
  }

  private methodConfig(): { upi?: boolean; card?: boolean; netbanking?: boolean; wallet?: boolean } {
    switch (this.selectedMethod) {
      case 'upi':
      case 'qr':
        return { upi: true };
      case 'bank':
        return { netbanking: true };
      default:
        return { card: true, netbanking: true, wallet: true };
    }
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
      method: this.methodConfig(),
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
