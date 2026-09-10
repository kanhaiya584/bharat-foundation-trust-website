import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DashboardDonation,
  DashboardSummary,
  DonationOrderResponse,
  DonationVerificationResponse,
  ContactRequest,
} from '../models';

export interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = environment.apiBaseUrl;

  get<T>(path: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { headers });
  }

  post<T>(path: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers });
  }

  download(path: string, headers?: HttpHeaders): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${path}`, { headers, responseType: 'blob' });
  }
}

@Injectable({ providedIn: 'root' })
export class DonationApiService extends ApiService {
  createOrder(payload: {
    donor_name: string;
    mobile: string;
    email?: string;
    address: string;
    amount: number;
    currency?: string;
    purpose?: string;
  }): Observable<ApiResponse<DonationOrderResponse>> {
    return this.post<ApiResponse<DonationOrderResponse>>('/donations/order', payload);
  }

  verifyPayment(payload: {
    donation_id: number;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    payment_method?: string;
  }): Observable<ApiResponse<DonationVerificationResponse>> {
    return this.post<ApiResponse<DonationVerificationResponse>>('/donations/verify', payload);
  }
}

@Injectable({ providedIn: 'root' })
export class AuthApiService extends ApiService {
  login(payload: { password: string }): Observable<ApiResponse<{ token: string }>> {
    return this.post<ApiResponse<{ token: string }>>('/auth/login', payload);
  }

  logout(): Observable<ApiResponse<null>> {
    return this.post<ApiResponse<null>>('/auth/logout', {});
  }
}

@Injectable({ providedIn: 'root' })
export class DashboardApiService extends ApiService {
  summary(): Observable<ApiResponse<DashboardSummary>> {
    return this.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
  }

  donations(params: string): Observable<ApiResponse<{ data: DashboardDonation[]; meta: { current_page: number; last_page: number; total: number } }>> {
    return this.get<ApiResponse<{ data: DashboardDonation[]; meta: { current_page: number; last_page: number; total: number } }>>(`/dashboard/donations${params}`);
  }

  exportCsv(params: string): Observable<Blob> {
    return this.download(`/dashboard/donations/export${params}`);
  }
}

@Injectable({ providedIn: 'root' })
export class ContactApiService extends ApiService {
  submit(payload: ContactRequest): Observable<ApiResponse<null>> {
    return this.post<ApiResponse<null>>('/contact', payload);
  }
}
