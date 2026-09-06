import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

const CONTACT_PHONE = '+919918884138';
const CONTACT_EMAIL = 'bharatfoundation.con@gmail.com';
const PREFILLED_MESSAGE = 'नमस्ते, मुझे भारत फाउंडेशन ट्रस्ट (Bharat Foundation Trust) के बारे में जानकारी चाहिए।';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="site-footer__brand">
        <div class="site-footer__logo"><img src="assets/bharat-foundation-trust-logo.png" alt="Bharat Foundation Trust logo"></div>
        <div>
          <h3>{{ language.label('Bharat Foundation Trust', 'भारत फाउंडेशन ट्रस्ट') }}</h3>
          <p>{{ language.label('Education, healthcare and support for children, women and families in need.', 'जरूरतमंद बच्चों, महिलाओं और परिवारों के लिए शिक्षा, स्वास्थ्य और सहयोग।') }}</p>
        </div>
      </div>

      <div class="site-footer__columns">
        <div>
          <h4>{{ language.label('Contact', 'संपर्क करें') }}</h4>
          <p>{{ language.label('Address: Malahiya Mafi, Post - Padri Piprapati, Kushinagar, Padrauna S.F., Padrauna, Kushinagar – 274304, Uttar Pradesh, India', 'पता: मलहिया माफी, पोस्ट- पडरी पिपरपाटी, कुशीनगर, पडरौना एस.एफ., पडरौना, कुशीनगर – 274304, उत्तर प्रदेश, भारत') }}</p>
          <p>{{ language.label('Phone: +91 9918884138', 'फोन: +91 9918884138') }}</p>
          <p>{{ language.label('Email: bharatfoundation.con@gmail.com', 'ईमेल: bharatfoundation.con@gmail.com') }}</p>
        </div>
        <div>
          <h4>{{ language.label('Connect', 'हमसे जुड़ें') }}</h4>
          <p>{{ language.label('Join us and be part of the change.', 'हमारे साथ जुड़कर बदलाव का हिस्सा बनें।') }}</p>
          <div class="site-footer__socials">
            <a class="social-icon" [href]="whatsappLink" target="_blank" rel="noopener" aria-label="WhatsApp"><img src="assets/whatsapp-icon.png" alt="WhatsApp"></a>
            <a class="social-icon" [href]="smsLink" aria-label="SMS"><img src="assets/sms-icon.png" alt="SMS"></a>
            <a class="social-icon" [href]="emailLink" aria-label="Email"><img src="assets/email-icon.jpeg" alt="Email"></a>
          </div>
        </div>
      </div>

      <div class="site-footer__meta">
        <span>© 2026 Bharat Foundation Trust</span>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer { margin-top: 42px; padding: 40px 24px 24px; background: linear-gradient(180deg, #0b2a55, #071c3b); color: #f3f7fb; border-radius: 32px 32px 0 0; }
    .site-footer__brand { display: flex; gap: 16px; align-items: start; max-width: 540px; }
    .site-footer__logo { width: 54px; height: 54px; border-radius: 18px; background: #fff; padding: 3px; display: grid; place-items: center; overflow: hidden; }
    .site-footer__logo img { width: 100%; height: 100%; object-fit: contain; }
    .site-footer__brand h3, .site-footer h4, .site-footer p { margin: 0; }
    .site-footer__brand p, .site-footer__columns p, .site-footer a { color: rgba(243,247,251,.8); }
    .site-footer__columns { margin-top: 28px; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 20px; }
    .site-footer__columns > div { display: grid; gap: 10px; }
    .site-footer__columns a { text-decoration: none; }
    .site-footer__socials { display: flex !important; flex-direction: row; align-items: center; gap: 10px; margin-top: 8px; }
    .social-icon { width: 40px; height: 40px; display: inline-grid; place-items: center; border-radius: 50%; background: #fff; overflow: hidden; box-shadow: 0 6px 16px rgba(0,0,0,.18); transition: transform .2s ease; }
    .social-icon:hover { transform: translateY(-2px); }
    .social-icon img { width: 100%; height: 100%; object-fit: cover; }
    .site-footer__meta { margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.12); display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; align-items: center; }
    .site-footer__meta a { color: rgba(243,247,251,.82); text-decoration: none; margin-left: 12px; }
    @media (max-width: 900px) { .site-footer__columns { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 560px) { .site-footer { margin-top: 26px; padding: 28px 18px 94px; border-radius: 24px 24px 0 0; } .site-footer__columns { grid-template-columns: 1fr; gap: 22px; } .site-footer__meta { display: block; line-height: 1.8; } .site-footer__meta a { margin: 0 12px 0 0; } }
  `]
})
export class FooterComponent {
  readonly whatsappLink = `https://wa.me/${CONTACT_PHONE.replace('+', '')}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;
  readonly smsLink = `sms:${CONTACT_PHONE}?body=${encodeURIComponent(PREFILLED_MESSAGE)}`;
  readonly emailLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Bharat Foundation Trust - Enquiry')}&body=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  constructor(readonly language: LanguageService) {}
}
