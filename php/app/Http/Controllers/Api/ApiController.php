<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    protected function success(mixed $data = null, string $message = 'OK', int $status = 200): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    protected function failure(string $message, int $status = 422, array $errors = []): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'errors' => (object) $errors,
        ], $status);
    }
}
