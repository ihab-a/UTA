<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Playlist;
use App\Models\File;
use App\Http\Requests\StreamRequest;

class StreamController extends Controller
{
    public function song(StreamRequest $req, Song $song){
        $file = File::_get($song->file);

        return response($file["content"], 200, $file["headers"]);
    }

    public function playlist(StreamRequest $req, Playlist $playlist){
        $target = (int)$req->query("t", 0);
        $songs = $playlist->_songs;

        if($songs->count() !== $target)
            return response()->json([
                "error" => "this song doesn't exist in the playlist",
            ], 400);

        // get target song file
        $file = File::_get($songs[$target]->file);

        return response($file["content"], 200, $file["headers"]);
    }
}