<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class RazorpayService
{
    private string $keyId;
    private string $keySecret;
    private string $webhookSecret;

    public function __construct()
    {
        $this->keyId = config('services.razorpay.key_id', '');
        $this->keySecret = config('services.razorpay.key_secret', '');
        $this->webhookSecret = config('services.razorpay.webhook_secret', '');
    }

    public function createOrder(int $amount, string $currency, string $receipt, array $notes = []): array
    {
        if ($this->keyId === '' || $this->keySecret === '') {
            throw new RuntimeException('Razorpay credentials are not configured.');
        }

        $response = Http::withBasicAuth($this->keyId, $this->keySecret)
            ->acceptJson()
            ->asJson()
            ->post('https://api.razorpay.com/v1/orders', [
                'amount' => $amount,
                'currency' => $currency,
                'receipt' => $receipt,
                'notes' => $notes,
            ]);

        if (! $response->successful()) {
            throw new RuntimeException('Razorpay order creation failed.');
        }

        return $response->json();
    }

    public function verifyPaymentSignature(string $orderId, string $paymentId, string $signature): bool
    {
        if ($this->keySecret === '') {
            return false;
        }

        $expected = hash_hmac('sha256', $orderId . '|' . $paymentId, $this->keySecret);

        return hash_equals($expected, $signature);
    }

    public function verifyWebhookSignature(string $rawBody, ?string $signature): bool
    {
        if (! $signature || $this->webhookSecret === '') {
            return false;
        }

        $expected = hash_hmac('sha256', $rawBody, $this->webhookSecret);

        return hash_equals($expected, $signature);
    }
}
