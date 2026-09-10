<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DonationController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:15,1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
});

Route::middleware('admin.token')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard/summary', [DashboardController::class, 'summary']);
    Route::get('/dashboard/donations', [DashboardController::class, 'donations']);
    Route::get('/dashboard/donations/export', [DashboardController::class, 'export']);
});

Route::middleware('throttle:20,1')->group(function () {
    Route::post('/donations/order', [DonationController::class, 'order']);
    Route::post('/donations/verify', [DonationController::class, 'verify']);
    Route::post('/contact', [ContactController::class, 'store']);
});

Route::post('/donations/webhook', [DonationController::class, 'webhook'])->withoutMiddleware([
    \App\Http\Middleware\VerifyCsrfToken::class,
]);
