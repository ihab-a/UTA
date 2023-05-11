<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Song>
 */
class SongFactory extends Factory
{
    protected $model = \App\Models\Song::class;
    public function definition($user = null): array
    {
        // get a random user for the notification
        $user = $user ?? \App\Models\User::inRandomOrder()->first()->id;

        return [
            "title" => $this->faker->sentence(3),
            "description" => [$this->faker->sentence(20), null][rand() % 2],
            "likes" => rand() % 2000000,
            "user" => $user,
        ];
    }
}
