<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        Notification::factory()
            ->count(10) // Create 10 random notifications
            ->create();

        // test user notifications
        $testUser = User::where("username", "test")->first()->id;
        Notification::factory($testUser)
            ->count(3)
            ->create();
    }
}
