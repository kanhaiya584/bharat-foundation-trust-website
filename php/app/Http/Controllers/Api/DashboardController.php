<?php

namespace App\Http\Controllers\Api;

use App\Models\Donation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends ApiController
{
    public function summary(Request $request): JsonResponse
    {
        $this->authorizeAdmin($request);

        $success = Donation::query()->where('status', 'success');

        return $this->success([
            'totalDonations' => (int) $success->sum('amount'),
            'totalDonors' => (int) $success->distinct('mobile')->count('mobile'),
            'successfulPayments' => (int) $success->count(),
            'failedPayments' => (int) Donation::query()->where('status', 'failed')->count(),
        ]);
    }

    public function donations(Request $request): JsonResponse
    {
        $this->authorizeAdmin($request);

        $page = max(1, (int) $request->integer('page', 1));
        $perPage = min(25, max(5, (int) $request->integer('per_page', 10)));

        $query = $this->filteredDonations($request);
        $paginator = $query->orderByDesc('created_at')->paginate($perPage, ['*'], 'page', $page);

        return $this->success([
            'data' => collect($paginator->items())->map(fn (Donation $donation) => $this->formatDonation($donation))->values(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function export(Request $request): StreamedResponse|JsonResponse
    {
        $this->authorizeAdmin($request);

        $rows = $this->filteredDonations($request)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Donation $donation) => $this->formatDonation($donation));

        return response()->streamDownload(function () use ($rows) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Date', 'Donor Name', 'Amount', 'Payment Method', 'Payment ID', 'Status']);

            foreach ($rows as $row) {
                fputcsv($handle, [
                    $row['createdAt'],
                    $row['donorName'],
                    $row['amount'],
                    $row['paymentMethod'],
                    $row['paymentId'],
                    $row['status'],
                ]);
            }

            fclose($handle);
        }, 'donations.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    private function filteredDonations(Request $request): Builder
    {
        return Donation::query()
            ->when($request->filled('search'), function (Builder $query) use ($request) {
                $search = '%' . $request->string('search')->toString() . '%';
                $query->where(function (Builder $subQuery) use ($search) {
                    $subQuery->where('donor_name', 'like', $search)
                        ->orWhere('email', 'like', $search)
                        ->orWhere('razorpay_payment_id', 'like', $search);
                });
            })
            ->when($request->filled('status'), fn (Builder $query) => $query->where('status', $request->string('status')->toString()))
            ->when($request->filled('amount_min'), fn (Builder $query) => $query->where('amount', '>=', (int) $request->integer('amount_min')))
            ->when($request->filled('amount_max'), fn (Builder $query) => $query->where('amount', '<=', (int) $request->integer('amount_max')))
            ->when($request->filled('from_date'), fn (Builder $query) => $query->whereDate('created_at', '>=', $request->date('from_date')))
            ->when($request->filled('to_date'), fn (Builder $query) => $query->whereDate('created_at', '<=', $request->date('to_date')));
    }

    private function formatDonation(Donation $donation): array
    {
        return [
            'id' => $donation->id,
            'donorName' => $donation->donor_name,
            'mobile' => $donation->mobile,
            'email' => $donation->email,
            'amount' => (int) $donation->amount,
            'currency' => $donation->currency,
            'paymentMethod' => $donation->payment_method,
            'paymentId' => $donation->razorpay_payment_id,
            'status' => $donation->status,
            'createdAt' => $donation->created_at?->toIso8601String(),
        ];
    }

    private function authorizeAdmin(Request $request): void
    {
        abort_unless($request->user()?->is_admin, 403, 'Unauthorized access.');
    }
}
