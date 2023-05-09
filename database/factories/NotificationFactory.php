<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\notification>
 */
class NotificationFactory extends Factory
{
    protected $model = \App\Models\Notification::class;
    public function definition($user = null): array
    {
        // get a random user for the notification
        $user = $user ?? \App\Models\User::inRandomOrder()->first()->id;
        $randomDay = now()->addDays(rand() % 10);

        return [
            "content" => $this->faker->sentence(10),
            "read" => [$randomDay, null][rand() % 2],
            "user" => $user,
        ];
    }
}
