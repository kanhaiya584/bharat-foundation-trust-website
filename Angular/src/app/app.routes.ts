import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HomePageComponent } from './pages/home/home-page.component';
import { AboutPageComponent } from './pages/about/about-page.component';
import { CausesPageComponent } from './pages/causes/causes-page.component';
import { DonatePageComponent } from './pages/donate/donate-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { PaymentSuccessPageComponent } from './pages/payment-success/payment-success-page.component';
import { PaymentFailurePageComponent } from './pages/payment-failure/payment-failure-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'causes', component: CausesPageComponent },
  { path: 'donate', component: DonatePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard] },
  { path: 'payment/success', component: PaymentSuccessPageComponent },
  { path: 'payment/failure', component: PaymentFailurePageComponent },
  { path: '**', redirectTo: '' },
];
