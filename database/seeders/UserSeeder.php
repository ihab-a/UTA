<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory()
            ->count(10) // Create 10 random users
            ->create();

        // test user
        User::create([
            "username" => "test",
            "firstname" => "testFirstName",
            "lastname" => "testLastName",
            "email" => "abc@email.com",
            "password" => \Illuminate\Support\Facades\Hash::make("test"),
        ]);
    }
}