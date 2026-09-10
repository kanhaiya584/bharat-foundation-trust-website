<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiSmokeTest extends TestCase
{
    public function test_admin_can_login_and_receive_token(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'password' => config('app.admin_password'),
        ]);

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => ['token'],
            ]);
    }

    public function test_dashboard_summary_requires_authentication(): void
    {
        $this->getJson('/api/dashboard/summary')->assertUnauthorized();
    }
}
