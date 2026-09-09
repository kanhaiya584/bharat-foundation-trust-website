import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { ContactApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';

const PREFILLED_MESSAGE = 'नमस्ते, मुझे भरत फाउंडेशन ट्रस्ट (Bharat Foundation Trust) के बारे में जानकारी चाहिए।';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, PageHeroComponent],
  template: `
    <app-page-hero
      eyebrow="Contact Us / संपर्क करें"
      title="Contact Us"
      subtitle="Reach out to learn more, coordinate support or ask about donations."
      imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
    />

    <section class="section contact">
      <div class="contact__grid">
        <div class="surface contact__details">
          <div>
            <p class="section__eyebrow">Contact Details</p>
            <h2 class="section__title">We are here to help</h2>
          </div>
          <div class="contact-card">
            <strong>Address</strong>
            <p>Malahiya Mafi, Post - Padri Piprapati, Kushinagar, Padrauna S.F., Padrauna, Kushinagar – 274304, Uttar Pradesh, India</p>
          </div>
          <div class="contact-card">
            <strong>Phone</strong>
            <p><a href="tel:+919918884138">+91 9918884138</a></p>
          </div>
          <div class="contact-card">
            <strong>Email</strong>
            <p><a [href]="emailLink">bharatfoundation.con&#64;gmail.com</a></p>
          </div>
          <div class="contact-card">
            <strong>Office Hours</strong>
            <p>Mon - Sat, 10:00 AM - 6:00 PM</p>
          </div>
          <div class="map-box">Google Maps embed area</div>
          <a class="btn btn-secondary" [href]="whatsappLink" target="_blank" rel="noopener"><img class="btn__icon" src="assets/whatsapp-icon.png" alt="">WhatsApp पर संपर्क करें</a>
        </div>

        <form class="surface contact__form" [formGroup]="form" (ngSubmit)="submit()">
          <div>
            <p class="section__eyebrow">Send a Message</p>
            <h2 class="section__title">Tell us how we can help</h2>
          </div>
          <label class="field"><span>Name</span><input formControlName="name" type="text"></label>
          <label class="field"><span>Email</span><input formControlName="email" type="email"></label>
          <label class="field"><span>Mobile</span><input formControlName="mobile" type="tel"></label>
          <label class="field field--full"><span>Message</span><textarea formControlName="message" rows="6"></textarea></label>
          <button class="btn btn-primary" type="submit" [disabled]="loading">{{ loading ? 'Submitting...' : 'Submit' }}</button>
          <p class="contact__message" *ngIf="message">{{ message }}</p>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .contact__grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 20px; }
    .contact__details, .contact__form { padding: 24px; display: grid; gap: 16px; }
    .contact-card { padding: 16px; border-radius: 18px; background: #f7fbff; border: 1px solid rgba(101,132,168,.12); display: grid; gap: 4px; }
    .contact-card strong { color: var(--navy-2); }
    .contact-card a { color: var(--text); text-decoration: none; }
    .contact-card a:hover { text-decoration: underline; }
    .btn__icon { width: 20px; height: 20px; object-fit: cover; border-radius: 50%; }
    .map-box { min-height: 180px; border-radius: 22px; background: linear-gradient(135deg, rgba(13,45,90,.8), rgba(10,122,56,.7)); color: #fff; display: grid; place-items: center; text-align: center; padding: 20px; }
    .field { display: grid; gap: 8px; }
    .field span { font-weight: 800; color: var(--navy-2); }
    .field input, .field textarea { width: 100%; border-radius: 14px; border: 1px solid rgba(23,50,95,.12); padding: 12px 14px; font: inherit; }
    .field--full { grid-column: 1 / -1; }
    .contact__form { grid-template-columns: repeat(2, minmax(0,1fr)); }
    .contact__message { grid-column: 1 / -1; margin: 0; color: var(--green-dark); font-weight: 700; }
    @media (max-width: 980px) {
      .contact__grid, .contact__form { grid-template-columns: 1fr; }
      .field--full { grid-column: auto; }
    }
  `]
})
export class ContactPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ContactApiService);
  private readonly seo = inject(SeoService);

  readonly whatsappLink = `https://wa.me/919918884138?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;
  readonly emailLink = `mailto:bharatfoundation.con@gmail.com?subject=${encodeURIComponent('Bharat Foundation Trust - Enquiry')}&body=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  loading = false;
  message = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.minLength(10)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    this.seo.setPage('Contact Us', 'Contact Bharat Foundation Trust by phone, email, WhatsApp or through the enquiry form.');
  }

  submit(): void {
    this.message = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message = 'Please complete all required fields.';
      return;
    }

    this.loading = true;
    this.api.submit(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Thank you. Your enquiry has been sent successfully.';
        this.form.reset();
      },
      error: () => {
        this.loading = false;
        this.message = 'Unable to submit right now. Please try again soon.';
      },
    });
  }
}
