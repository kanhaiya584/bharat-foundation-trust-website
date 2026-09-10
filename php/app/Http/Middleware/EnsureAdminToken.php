<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token || ! Cache::has($this->cacheKey($token))) {
            abort(401, 'Unauthenticated.');
        }

        return $next($request);
    }

    private function cacheKey(string $token): string
    {
        return 'admin_token:' . hash('sha256', $token);
    }
}
