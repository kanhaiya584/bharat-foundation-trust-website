import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trustee-card',
  standalone: true,
  template: `
    <article class="trustee-card">
      <img [src]="imageUrl" [alt]="name" loading="lazy" />
      <h3>{{ name }}</h3>
      <p>{{ designation }}</p>
    </article>
  `,
  styles: [`
    .trustee-card { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.94); box-shadow: 0 14px 35px rgba(4,32,70,.08); border: 1px solid rgba(101,132,168,.13); text-align: center; }
    .trustee-card img { width: 104px; height: 104px; border-radius: 50%; object-fit: cover; margin: 0 auto 14px; border: 4px solid #eaf4fb; }
    .trustee-card h3 { margin: 0; color: #17325f; font-size: 1rem; }
    .trustee-card p { margin: 6px 0 0; color: #5a6f88; }
  `]
})
export class TrusteeCardComponent {
  @Input() name = '';
  @Input() designation = '';
  @Input() imageUrl = '';
}
