<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Http\Requests\SongGenreRequest;
use App\Http\Resources\GenreCollection;

class SongGenreController extends Controller
{
    public function store(SongGenreRequest $req, Song $song)
    {
        $song->_genres()->syncWithoutDetaching($req->genres);

        return response()->json([
            "msg" => "genres saved successfully",
            "genres" => new GenreCollection($song->_genres),
        ], 201);
    }

    public function destroy(SongGenreRequest $req, Song $song)
    {
        $song->_genres()->detach($req->genres);

        return response()->json([
            "msg" => "genres removed successfully",
            "genres" => new GenreCollection($song->_genres),
        ], 201);
    }
}
