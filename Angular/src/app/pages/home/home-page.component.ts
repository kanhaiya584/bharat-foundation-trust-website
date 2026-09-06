import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home-page', standalone: true, imports: [RouterLink],
  template: `
    <section class="hero">
      @for (slide of heroSlides; track slide; let i = $index) {
        <div class="hero__bg" [class.active]="i === activeSlide" [style.background-image]="'url(' + slide + ')'"></div>
      }
      <div class="hero__overlay"></div>
      <div class="hero__copy"><p>साथ मिलकर, एक बेहतर कल की ओर</p><h1>छोटा योगदान,<br><em>बड़ा बदलाव</em></h1><p class="hero__text">जरूरतमंद लोगों के लिए स्वस्थ, शिक्षित और समावेशी भविष्य बनाने के हमारे मिशन का साथ दें।</p><div class="hero__actions"><a class="btn btn-primary" routerLink="/donate">♥ &nbsp; अभी दान करें</a><a class="btn btn-secondary" routerLink="/causes">◉ &nbsp; हमारे कार्य देखें</a></div></div>
      <div class="hero__dots">
        @for (slide of heroSlides; track slide; let i = $index) {
          <i [class.active]="i === activeSlide" (click)="goToSlide(i)"></i>
        }
      </div>
    </section>
      <section class="section areas"><div class="heading"><b></b><h2>हमारे प्रमुख क्षेत्र</h2><b></b><p>जहाँ जरूरत सबसे अधिक है, हम वहीं काम करते हैं</p></div><div class="area-grid">@for (area of areas; track area.title) {<a class="area" [class.green]="area.tone === 'green'" [class.purple]="area.tone === 'purple'" [class.orange]="area.tone === 'orange'" [routerLink]="area.route"><span class="area__icon">{{ area.icon }}</span><span><strong>{{ area.title }}</strong><small>{{ area.text }}</small></span><i>→</i></a>}</div></section>
    <section class="section"><div class="support"><span class="support__icon">♡</span><div><h2>आपका छोटा सा सहयोग<br>किसी की जिंदगी बदल सकता है।</h2><p>आज किया गया आपका योगदान किसी परिवार तक शिक्षा, स्वास्थ्य और उम्मीद पहुँचा सकता है।</p><a class="btn btn-primary" routerLink="/donate">♥ &nbsp; अभी दान करें &nbsp; →</a></div></div></section>
    <section class="section impact"><div class="heading"><b></b><h2>हमारे प्रभाव</h2><b></b></div><div class="stats">@for (stat of stats; track stat.value) {<div><span>{{ stat.icon }}</span><strong>{{ stat.value }}</strong><small>{{ stat.text }}</small></div>}</div></section>
  `,
  styles: [`
    :host { display:block; }.hero { position:relative; min-height:360px; overflow:hidden; border-radius:0 0 24px 24px; color:#fff; }.hero__bg { position:absolute; inset:0; z-index:0; background-position:center; background-size:cover; background-repeat:no-repeat; opacity:0; transition:opacity 1.2s ease; }.hero__bg.active { opacity:1; }.hero__overlay { position:absolute; inset:0; z-index:1; pointer-events:none; background:linear-gradient(90deg,rgba(3,35,72,.98),rgba(3,47,73,.78) 48%,rgba(3,47,73,.08)); }.hero__copy { position:relative; z-index:2; max-width:590px; padding:38px 42px; }.hero p { margin:0 0 8px; }.hero h1 { margin:0 0 12px; font-size:clamp(2.5rem,5vw,4rem); line-height:1.02; }.hero h1 em { color:#0bc66a; font-style:normal; }.hero__text { max-width:470px; line-height:1.45; color:#e9f4fa; }.hero__actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:22px; }.hero .btn { padding:13px 20px; }.hero__dots { position:absolute; z-index:3; bottom:15px; left:0; right:0; display:flex; justify-content:center; gap:10px; }.hero__dots i { width:10px; height:10px; border-radius:50%; background:#6693b4; cursor:pointer; transition:background .25s ease; }.hero__dots i.active { background:#a1f0c0; }.heading { display:grid; grid-template-columns:54px auto 54px; align-items:center; justify-content:center; gap:12px; text-align:center; color:#0d4b87; }.heading b { height:3px; background:#11984a; }.heading h2 { margin:0; font-size:2rem; }.heading p { grid-column:1/-1; margin:0 0 18px; }.area-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }.area { min-height:128px; position:relative; display:flex; align-items:center; gap:13px; padding:13px; border:1px solid #b7d9fb; border-radius:14px; background:#f1f8ff; color:#0d4b87; text-decoration:none; }.area.green { background:#f1fcf5; border-color:#a8e4c3; }.area.purple { background:#f8f4ff; border-color:#d8c7fb; }.area.orange { background:#fff8ee; border-color:#f7d19a; }.area__icon { flex:0 0 62px; width:62px; height:62px; display:grid; place-items:center; border-radius:50%; background:#1264b4; color:#fff; font-size:1.7rem; }.green .area__icon { background:#079448; }.purple .area__icon { background:#7047cc; }.orange .area__icon { background:#f28b00; }.area strong,.area small { display:block; }.area strong { color:#0d4b87; font-size:1.1rem; }.area small { max-width:190px; margin-top:5px; color:#315d89; line-height:1.45; font-size:.96rem; }.area i { position:absolute; right:12px; bottom:11px; width:30px; height:30px; display:grid; place-items:center; border-radius:50%; background:currentColor; color:#fff; font-style:normal; }.support { display:flex; gap:18px; align-items:flex-start; padding:25px 24px; min-height:190px; overflow:hidden; border-radius:20px; color:#fff; background:linear-gradient(100deg,#052e57,#07516c 50%,#0e7950); }.support__icon { flex:0 0 62px; height:62px; display:grid; place-items:center; border-radius:50%; background:#08ad58; font-size:2.2rem; }.support h2 { margin:0 0 8px; font-size:1.55rem; line-height:1.15; }.support p { margin:0 0 14px; line-height:1.4; }.support .btn { padding:10px 18px; }.impact { margin:22px 16px 18px; padding:20px 18px; border:1px solid #bfead4; border-radius:18px; background:#f0fcf6; }.stats { display:grid; grid-template-columns:repeat(4,1fr); margin-top:12px; }.stats > div { display:grid; justify-items:center; gap:3px; padding:0 10px; text-align:center; border-right:1px solid #c9dfdf; color:#0d4b87; }.stats > div:last-child { border:0; }.stats span { width:42px; height:42px; display:grid; place-items:center; border-radius:50%; background:#0a9c50; color:#fff; }.stats strong { font-size:1.45rem; }.stats small { font-size:.75rem; }
    @media (max-width:720px) { .hero { min-height:360px; }.hero__copy { padding:34px 20px 18px; }.hero h1 { font-size:2.45rem; }.hero__text { font-size:.92rem; }.hero__actions { gap:10px; margin-top:18px; }.hero .btn { padding:11px 14px; font-size:.82rem; }.section { margin-top:20px; }.heading { grid-template-columns:40px auto 40px; gap:8px; }.heading h2 { font-size:1.6rem; }.heading p { font-size:.86rem; }.area-grid { gap:12px; }.area { min-height:116px; gap:8px; padding:10px; }.area__icon { flex-basis:50px; width:50px; height:50px; font-size:1.35rem; }.area strong { font-size:.95rem; }.area small { font-size:.82rem; }.area i { width:26px; height:26px; right:8px; bottom:8px; }.support { padding:20px 16px; gap:12px; }.support__icon { flex-basis:48px; height:48px; font-size:1.7rem; }.support h2 { font-size:1.18rem; }.support p { font-size:.78rem; }.impact { margin:20px 16px 18px; padding:17px 8px; }.stats > div { padding:0 3px; }.stats span { width:36px; height:36px; font-size:.9rem; }.stats strong { font-size:1.05rem; }.stats small { font-size:.58rem; } }
    @media (min-width:721px) { .hero { border-radius:28px; } }
  `]
})
export class HomePageComponent implements OnInit, OnDestroy {
  readonly heroSlides = [
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1400&q=85',
  ];
  activeSlide = 0;
  private slideTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.slideTimer = setInterval(() => this.goToSlide((this.activeSlide + 1) % this.heroSlides.length), 4000);
  }

  ngOnDestroy(): void {
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  goToSlide(i: number): void { this.activeSlide = i; }

  readonly areas = [{title:'जरूरतमंद बेटियों के विवाह में सहयोग',text:'कठिन परिस्थितियों से गुजर रहे परिवारों की बेटियों के विवाह में यथासंभव सहयोग।',icon:'♥',tone:'orange',route:'/donate'},{title:'शिक्षा',text:'हर बच्चे तक गुणवत्तापूर्ण शिक्षा पहुँचाना',icon:'◆',tone:'blue',route:'/causes'},{title:'स्वास्थ्य',text:'जरूरतमंद परिवारों के लिए स्वास्थ्य सहायता',icon:'♥',tone:'green',route:'/causes'},{title:'महिला एवं बाल कल्याण',text:'महिलाओं और बच्चों को सुरक्षित एवं सशक्त बनाना',icon:'●',tone:'purple',route:'/causes'},{title:'सामुदायिक सहयोग',text:'समुदायों को आत्मनिर्भर बनाने की दिशा में प्रयास',icon:'♟',tone:'orange',route:'/causes'}];
  readonly stats = [{value:'10,000+',text:'लोगों तक सहायता',icon:'♟'},{value:'50+',text:'सामुदायिक कार्यक्रम',icon:'▣'},{value:'25+',text:'गाँवों में पहल',icon:'●'},{value:'100%',text:'समर्पण और पारदर्शिता',icon:'◇'}];
  constructor(readonly language: LanguageService, private readonly seo: SeoService) { this.seo.setPage('Home', 'Bharat Foundation Trust: small contributions create big changes.'); }
}
