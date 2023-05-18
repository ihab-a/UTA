<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Playlist;
use App\Http\Requests\SuggestionRequest;
use App\Http\Resources\SongCollection;
use App\Http\Resources\PlaylistCollection;
use Illuminate\Support\Facades\DB;

class SuggestionController extends Controller
{
    public function index(SuggestionRequest $req)
    {
        // returns suggestions based on AUTH_USER seen songs 

        $songs = [];

        // number of songs to suggest
        $count = 20;

        $targetGenres = DB::table('users')
            ->select('genres.id as id', DB::raw('COUNT(genres.id) as factor'))
            ->join('song_plays', 'users.id', '=', 'song_plays.user')
            ->join('song_genres', 'song_genres.song', '=', 'song_plays.song')
            ->join('genres', 'song_genres.genre', '=', 'genres.id')
            ->where('users.id', '=', AUTH_USER->id)
            ->groupBy('genres.id')
            ->orderBy('factor', 'DESC')
            ->get();

        $factorTotal = $targetGenres->sum("factor");

        foreach($targetGenres as $genre){
            array_push($songs, ...Song::inRandomOrder()
                ->whereHas("_genres", function ($q) use($count, $genre, $factorTotal){
                    $q->where("id", $genre->id);
                })->limit(floor($count * $genre->factor / $factorTotal))->get()
            );
        }

        // add the rest as random
        array_push($songs, ...Song::inRandomOrder()->limit($count - count($songs))->get());

        // playlist suggestions
        $playlists =  new PlaylistCollection(
            Playlist::where("private", false)->inRandomOrder()->limit($count)->get()
        );

        return response()->json([
            "songs" => new SongCollection($songs),
            "playlists" => new PlaylistCollection($playlists),
        ], 200);
    }

    public function store(SuggestionRequest $req)
    {
        AUTH_USER->_plays()->syncWithoutDetaching([$req->song]);

        return response("", 200);
    }
}
