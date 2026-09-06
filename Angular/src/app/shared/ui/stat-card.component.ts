import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <article class="stat-card">
      <div class="stat-card__icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path [attr.d]="iconPath"></path>
        </svg>
      </div>
      <div>
        <p class="stat-card__value">{{ value }}</p>
        <p class="stat-card__label">{{ label }}</p>
        <p class="stat-card__detail">{{ detail }}</p>
      </div>
    </article>
  `,
  styles: [`
    .stat-card { display: grid; grid-template-columns: 56px 1fr; gap: 14px; align-items: start; padding: 22px; border-radius: 24px; background: rgba(255,255,255,.92); box-shadow: 0 18px 40px rgba(4, 32, 70, .08); border: 1px solid rgba(101, 132, 168, .14); }
    .stat-card__icon { width: 56px; height: 56px; border-radius: 18px; display: grid; place-items: center; background: linear-gradient(135deg, #e8f7ef, #f5fbff); color: #107a39; }
    .stat-card__icon svg { width: 28px; height: 28px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .stat-card__value { margin: 0; font-size: 1.35rem; font-weight: 800; color: #17325f; }
    .stat-card__label { margin: 4px 0 0; font-weight: 700; color: #17325f; }
    .stat-card__detail { margin: 6px 0 0; color: #5a6f88; font-size: .98rem; line-height: 1.5; }
  `]
})
export class StatCardComponent {
  @Input() iconPath = '';
  @Input() value = '';
  @Input() label = '';
  @Input() detail = '';
}
