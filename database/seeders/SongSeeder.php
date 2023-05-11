<?php

namespace Database\Seeders;

use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        Song::factory()
            ->count(10)
            ->create();

        // test user songs
        $testUser = User::where("username", "test")->first()->id;
        Song::factory($testUser)
            ->count(3)
            ->create();
    }
}
