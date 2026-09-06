<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDonationOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'donor_name' => ['required', 'string', 'min:2', 'max:120'],
            'mobile' => ['required', 'regex:/^[6-9]\d{9}$/'],
            'email' => ['nullable', 'email', 'max:160'],
            'address' => ['required', 'string', 'min:5', 'max:500'],
            'amount' => ['required', 'integer', 'min:100', 'max:10000000'],
            'currency' => ['nullable', 'string', 'size:3'],
            'purpose' => ['nullable', 'string', 'max:150'],
        ];
    }
}
