<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Database\Seeder;

class PlaylistSeeder extends Seeder
{
    public function run(): void
    {
        Playlist::factory()
            ->count(10)
            ->create();

        // test user playlists
        $testUser = User::where("username", "test")->first()->id;
        Playlist::factory($testUser)
            ->count(3)
            ->create();

        // add songs to each playlist
        foreach(Playlist::all() as $playlist){
            $playlist->_songs()->sync(
                Song::inRandomOrder()->limit(4)->get()
            );
        }
    }
}
