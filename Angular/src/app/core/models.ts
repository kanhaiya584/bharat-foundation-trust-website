export interface HeroStat {
  label: string;
  value: string;
  detail: string;
  iconPath: string;
}

export interface ContentCard {
  title: string;
  description: string;
  imageUrl: string;
  route: string;
  iconPath: string;
  ctaLabel?: string;
}

export interface Trustee {
  name: string;
  designation: string;
  imageUrl: string;
}

export interface DonationSummary {
  totalDonations: number;
  totalDonors: number;
  successfulPayments: number;
  failedPayments: number;
  beneficiariesHelped: number;
  recentPublicDonations: Array<{
    name: string;
    amount: number;
    createdAt: string;
  }>;
}

export interface DonationOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  razorpayKeyId: string;
  donationId: number;
  receipt: string;
}

export interface DonationVerificationResponse {
  donationId: number;
  status: 'success' | 'failed';
  donorName: string;
  amount: number;
  currency: string;
  paymentId?: string;
  paymentMethod?: string | null;
  createdAt: string;
}

export interface DashboardSummary {
  totalDonations: number;
  totalDonors: number;
  successfulPayments: number;
  failedPayments: number;
}

export interface DashboardDonation {
  id: number;
  donorName: string;
  mobile: string;
  email: string | null;
  amount: number;
  currency: string;
  paymentMethod: string | null;
  paymentId: string | null;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  createdAt: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  mobile: string;
  message: string;
}
