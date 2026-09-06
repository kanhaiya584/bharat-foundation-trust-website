<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactController extends ApiController
{
    public function store(ContactRequest $request): JsonResponse
    {
        ContactMessage::create([
            'name' => $request->string('name')->toString(),
            'email' => $request->string('email')->toString(),
            'mobile' => $request->string('mobile')->toString(),
            'message' => $request->string('message')->toString(),
            'status' => 'new',
        ]);

        return $this->success(null, 'Your message was submitted successfully.');
    }
}
