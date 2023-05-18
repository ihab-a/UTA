<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Playlist;
use App\Http\Requests\SearchRequest;
use App\Http\Resources\SongCollection;
use App\Http\Resources\PlaylistCollection;

class SearchController extends Controller
{
    public function store(SearchRequest $req)
    {
        // get songs that match the query
        $songs = Song::where("title", "like", "%{$req->q}%")->get();

        // get playlists that match the query
        $playlists = Playlist::where("private", false)->where("title", "like", "%{$req->q}%")->get();

        return response()->json([
            "songs" => new SongCollection($songs),
            "playlists" => new PlaylistCollection($playlists),
        ], 200);
    }
}
