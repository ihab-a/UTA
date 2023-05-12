<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Song>
 */
class SongFactory extends Factory
{
    protected $model = \App\Models\Song::class;
    public function definition(): array
    {
        // get a random user for the song
        $user = \App\Models\User::inRandomOrder()->first()->id;

        return [
            "description" => [$this->faker->sentence(20), null][rand() % 2],
            "user" => $user,
        ];
    }
    public function file($file){
        return $this->state(function (array $attributes) use ($file) {
            return [
                "file" => $file,
            ];
        });
    }
    public function user($user){
        return $this->state(function (array $attributes) use ($user) {
            return [
                "file" => $user,
            ];
        });
    }
    public function title($title){
        return $this->state(function (array $attributes) use ($title) {
            return [
                "title" => $title,
            ];
        });
    }
}
