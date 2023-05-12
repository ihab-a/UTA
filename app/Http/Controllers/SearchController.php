<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Playlist;
use App\Http\Requests\SearchRequest;

class SearchController extends Controller
{
    public function store(SearchRequest $req)
    {
        // get songs that match the query
        $songs = Song::select(["id", "title"])
            ->whereRaw("MATCH(title) AGAINST(?)", $req->q)
            ->orderByRaw("MATCH(title) AGAINST(?) DESC", $req->q)
            ->get();

        // get playlists that match the query
        $playlists = Playlist::select(["id", "title"])
            ->where("private", false)
            ->whereRaw("MATCH(title) AGAINST(?)", $req->q)
            ->orderByRaw("MATCH(title) AGAINST(?) DESC", $req->q)
            ->get();

        return response()->json([
            "songs" => $songs,
            "playlists" => $playlists,
        ], 200);
    }
}
