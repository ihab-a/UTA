<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = \App\Models\User::class;
    public function definition(): array
    {
        $firstname = $this->faker->firstName;
        $lastname = $this->faker->lastName;
        $emailDomain = $this->faker->domainName;
        $randomUniqueNumber = $this->faker->unique()->randomNumber(5);
        
        return [
            "username" => $this->faker->unique()->userName,
            "firstname" => $firstname,
            "lastname" => $lastname,
            "email" => "$firstname.$lastname.$randomUniqueNumber@$emailDomain",
            "password" => $this->faker->password,
        ];
    }
}
