<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Http\Requests\SuggestionRequest;
use App\Http\Resources\SongCollection;
use Illuminate\Support\Facades\DB;

class SuggestionController extends Controller
{
    public function index(SuggestionRequest $req)
    {
        // returns suggestions based on AUTH_USER seen songs 

        $res = [];

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

        if($targetGenres->count() === 0) return response()->json([], 200);

        $factorTotal = $targetGenres->sum("factor");

        foreach($targetGenres as $genre){
            array_push($res, ...Song::inRandomOrder()
                ->whereHas("_genres", function ($q) use($count, $genre, $factorTotal){
                    $q->where("id", $genre->id);
                })->limit(floor($count * $genre->factor / $factorTotal))->get()
            );
        }

        // add the rest as random
        array_push($res, ...Song::inRandomOrder()->limit($count - count($res))->get());

        return response()->json(new SongCollection($res), 200);
    }

    public function store(SuggestionRequest $req)
    {
        AUTH_USER->_plays()->syncWithoutDetaching([$req->song]);

        return response("", 200);
    }
}
