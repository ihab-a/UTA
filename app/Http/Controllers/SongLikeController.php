<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use App\Http\Resources\SongCollection;
use App\Http\Resources\SongResource;

class SongLikeController extends Controller
{
    public function index()
    {
        return new SongCollection(
            AUTH_USER->_likedSongs
        );
    }

    public function store(Song $song){
        $res = $song->_likes()->toggle([
            "user" => AUTH_USER->id
        ]);

        $res = count($res["attached"]) ? true : false;

        return response()->json(
            new SongResource($song)
        , 200);
    }
}
