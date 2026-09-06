<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'mobile' => ['required', 'string', 'min:10', 'max:20'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ];
    }
}
