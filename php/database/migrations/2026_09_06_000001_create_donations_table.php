<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donor_name');
            $table->string('mobile', 20);
            $table->string('email')->nullable();
            $table->unsignedInteger('amount');
            $table->string('currency', 3)->default('INR');
            $table->string('razorpay_order_id')->nullable();
            $table->string('razorpay_payment_id')->nullable();
            $table->string('razorpay_signature')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('status')->default('pending');
            $table->string('webhook_status')->default('pending');
            $table->timestamps();

            $table->index('razorpay_order_id');
            $table->index('razorpay_payment_id');
            $table->index('mobile');
            $table->index('created_at');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
