<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Playlist>
 */
class PlaylistFactory extends Factory
{
    protected $model = \App\Models\Playlist::class;
    public function definition($user = null): array
    {
        // get a random user for the notification
        $user = $user ?? \App\Models\User::inRandomOrder()->first()->id;

        return [
            "title" => $this->faker->sentence(3),
            "description" => [$this->faker->sentence(20), null][rand() % 2],
            "private" => rand() % 2,
            "user" => $user,
        ];
    }
}
