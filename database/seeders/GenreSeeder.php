<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        $genres = [
            ["title" => "Rock"],
            ["title" => "Pop"],
            ["title" => "Hip Hop"],
            ["title" => "Jazz"],
            ["title" => "Country"],
            ["title" => "Electronic"],
            ["title" => "Classical"],
            ["title" => "Reggae"],
            ["title" => "Blues"],
            ["title" => "Folk"],
        ];

        DB::table("genres")->insert($genres);
    }
}
