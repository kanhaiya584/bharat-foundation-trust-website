<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiSmokeTest extends TestCase
{
    public function test_public_impact_endpoint_is_available(): void
    {
        $response = $this->getJson('/api/public/impact');

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    'totalDonations',
                    'totalDonors',
                    'successfulPayments',
                    'failedPayments',
                    'beneficiariesHelped',
                    'recentPublicDonations',
                ],
            ]);
    }

    public function test_admin_can_login_and_receive_token(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'login' => env('ADMIN_EMAIL', 'admin@yourtrustname.org'),
            'password' => env('ADMIN_PASSWORD', 'Trust@12345'),
        ]);

        $response->assertOk()
            ->assertJsonPath('data.user.email', env('ADMIN_EMAIL', 'admin@yourtrustname.org'))
            ->assertJsonStructure([
                'message',
                'data' => [
                    'token',
                    'user' => ['name', 'email'],
                ],
            ]);
    }

    public function test_dashboard_summary_requires_authentication(): void
    {
        $this->getJson('/api/dashboard/summary')->assertUnauthorized();
    }
}
