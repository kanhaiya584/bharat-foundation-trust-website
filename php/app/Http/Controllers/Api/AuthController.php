<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class AuthController extends ApiController
{
    private const TOKEN_TTL_HOURS = 12;

    public function login(LoginRequest $request): JsonResponse
    {
        $password = $request->string('password')->toString();

        if (! hash_equals((string) config('app.admin_password'), $password)) {
            return $this->failure('Invalid password.', 422);
        }

        $token = Str::random(64);
        Cache::put($this->cacheKey($token), true, now()->addHours(self::TOKEN_TTL_HOURS));

        return $this->success(['token' => $token], 'Login successful.');
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        if ($token) {
            Cache::forget($this->cacheKey($token));
        }

        return $this->success(null, 'Logged out successfully.');
    }

    private function cacheKey(string $token): string
    {
        return 'admin_token:' . hash('sha256', $token);
    }
}
