import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-payment-failure-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="result surface">
      <div class="result__icon">!</div>
      <h1>Payment Unsuccessful</h1>
      <p>Your payment could not be completed. Please try again.</p>

      <div class="result__actions">
        <a class="btn btn-primary" routerLink="/donate">Try Again</a>
        <a class="btn btn-secondary" routerLink="/">Back to Home</a>
      </div>
    </section>
  `,
  styles: [`
    .result { max-width: 700px; margin: 0 auto; padding: 34px; text-align: center; display: grid; gap: 16px; }
    .result__icon { width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; margin: 0 auto; font-size: 2.2rem; font-weight: 900; background: #fff3f1; color: #b42318; }
    .result h1 { margin: 0; font-size: clamp(2rem, 4vw, 3rem); }
    .result p { margin: 0; color: var(--muted); }
    .result__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }
  `]
})
export class PaymentFailurePageComponent {
  constructor(private readonly seo: SeoService) {
    this.seo.setPage('Payment Unsuccessful', 'Your donation payment did not complete. Please try again.');
  }
}
