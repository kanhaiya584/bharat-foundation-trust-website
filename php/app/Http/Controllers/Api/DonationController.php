<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreDonationOrderRequest;
use App\Http\Requests\VerifyDonationRequest;
use App\Models\Donation;
use App\Services\RazorpayService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DonationController extends ApiController
{
    public function order(StoreDonationOrderRequest $request, RazorpayService $razorpay): JsonResponse
    {
        $currency = strtoupper($request->string('currency')->toString() ?: 'INR');
        $amount = (int) $request->integer('amount');

        $donation = Donation::create([
            'donor_name' => $request->string('donor_name')->toString(),
            'mobile' => $request->string('mobile')->toString(),
            'email' => $request->input('email'),
            'address' => $request->string('address')->toString(),
            'amount' => $amount,
            'currency' => $currency,
            'status' => 'pending',
            'webhook_status' => 'pending',
        ]);

        try {
            $order = $razorpay->createOrder(
                $amount * 100,
                $currency,
                'donation-' . $donation->id,
                [
                    'donation_id' => (string) $donation->id,
                    'donor_name' => $donation->donor_name,
                ]
            );
        } catch (\Throwable $e) {
            $donation->update(['status' => 'failed']);

            return $this->failure('Unable to create Razorpay order.', 502);
        }

        $donation->update([
            'razorpay_order_id' => $order['id'] ?? null,
            'webhook_status' => 'order_created',
        ]);

        return $this->success([
            'orderId' => $order['id'] ?? '',
            'amount' => (int) ($order['amount'] ?? $amount * 100),
            'currency' => $order['currency'] ?? $currency,
            'razorpayKeyId' => config('services.razorpay.key_id'),
            'donationId' => $donation->id,
            'receipt' => $order['receipt'] ?? 'donation-' . $donation->id,
        ], 'Donation order created successfully.');
    }

    public function verify(VerifyDonationRequest $request, RazorpayService $razorpay): JsonResponse
    {
        $donation = Donation::query()->findOrFail($request->integer('donation_id'));

        if ($donation->status === 'success'
            && $donation->razorpay_payment_id === $request->string('razorpay_payment_id')->toString()
        ) {
            return $this->success($this->formatDonation($donation), 'Donation already verified.');
        }

        if (! $razorpay->verifyPaymentSignature(
            $request->string('razorpay_order_id')->toString(),
            $request->string('razorpay_payment_id')->toString(),
            $request->string('razorpay_signature')->toString()
        )) {
            $donation->update([
                'status' => 'failed',
                'webhook_status' => 'signature_mismatch',
            ]);

            return $this->failure('Payment signature verification failed.', 422);
        }

        $donation->update([
            'razorpay_order_id' => $request->string('razorpay_order_id')->toString(),
            'razorpay_payment_id' => $request->string('razorpay_payment_id')->toString(),
            'razorpay_signature' => $request->string('razorpay_signature')->toString(),
            'payment_method' => $request->input('payment_method'),
            'status' => 'success',
            'webhook_status' => 'verified',
        ]);

        return $this->success($this->formatDonation($donation->fresh()), 'Payment verified successfully.');
    }

    public function webhook(Request $request, RazorpayService $razorpay): JsonResponse
    {
        $rawBody = $request->getContent();
        $signature = $request->header('X-Razorpay-Signature');

        if (! $razorpay->verifyWebhookSignature($rawBody, $signature)) {
            return $this->failure('Invalid webhook signature.', 400);
        }

        $payload = json_decode($rawBody, true);
        $event = data_get($payload, 'event');
        $orderId = data_get($payload, 'payload.order.entity.id')
            ?? data_get($payload, 'payload.payment.entity.order_id')
            ?? data_get($payload, 'payload.payment.entity.orderId');

        if (! $orderId) {
            return $this->success(null, 'Webhook ignored.');
        }

        $donation = Donation::query()->where('razorpay_order_id', $orderId)->first();

        if (! $donation) {
            return $this->success(null, 'Donation not found for webhook.');
        }

        $paymentId = data_get($payload, 'payload.payment.entity.id');
        $paymentMethod = data_get($payload, 'payload.payment.entity.method');

        if (in_array($event, ['payment.captured', 'order.paid'], true)) {
            $donation->update([
                'razorpay_payment_id' => $paymentId ?: $donation->razorpay_payment_id,
                'payment_method' => $paymentMethod ?: $donation->payment_method,
                'status' => 'success',
                'webhook_status' => 'verified',
            ]);
        }

        if ($event === 'payment.failed') {
            $donation->update([
                'status' => 'failed',
                'webhook_status' => 'failed',
            ]);
        }

        return $this->success(null, 'Webhook processed successfully.');
    }

    private function formatDonation(Donation $donation): array
    {
        return [
            'donationId' => $donation->id,
            'status' => $donation->status,
            'donorName' => $donation->donor_name,
            'amount' => (int) $donation->amount,
            'currency' => $donation->currency,
            'paymentId' => $donation->razorpay_payment_id,
            'paymentMethod' => $donation->payment_method,
            'createdAt' => $donation->created_at?->toIso8601String(),
        ];
    }
}
