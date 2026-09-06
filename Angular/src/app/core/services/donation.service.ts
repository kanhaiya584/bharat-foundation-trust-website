import { Injectable, computed, signal } from '@angular/core';
import { tap } from 'rxjs';
import { DonationApiService } from './api.service';
import { DonationVerificationResponse } from '../models';

export interface DonationFormValue {
  donor_name: string;
  mobile: string;
  email: string;
  address: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class DonationService {
  private readonly latestReceiptKey = 'trust_latest_receipt';
  private readonly receiptSignal = signal<DonationVerificationResponse | null>(this.readReceipt());

  readonly receipt = computed(() => this.receiptSignal());

  constructor(private readonly api: DonationApiService) {}

  createOrder(form: DonationFormValue) {
    return this.api.createOrder({
      donor_name: form.donor_name,
      mobile: form.mobile,
      email: form.email,
      address: form.address,
      amount: form.amount,
      currency: 'INR',
      purpose: 'General Trust Donation',
    });
  }

  verifyPayment(payload: {
    donationId: number;
    orderId: string;
    paymentId: string;
    signature: string;
    paymentMethod?: string;
  }) {
    return this.api.verifyPayment({
      donation_id: payload.donationId,
      razorpay_order_id: payload.orderId,
      razorpay_payment_id: payload.paymentId,
      razorpay_signature: payload.signature,
      payment_method: payload.paymentMethod,
    }).pipe(
      tap((response) => this.saveReceipt(response.data))
    );
  }

  saveReceipt(receipt: DonationVerificationResponse): void {
    localStorage.setItem(this.latestReceiptKey, JSON.stringify(receipt));
    this.receiptSignal.set(receipt);
  }

  clearReceipt(): void {
    localStorage.removeItem(this.latestReceiptKey);
    this.receiptSignal.set(null);
  }

  private readReceipt(): DonationVerificationResponse | null {
    const raw = localStorage.getItem(this.latestReceiptKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as DonationVerificationResponse;
    } catch {
      return null;
    }
  }
}
