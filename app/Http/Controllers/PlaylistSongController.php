<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PlaylistSongRequest;
use App\Models\Playlist;
use App\Models\Song;
use App\Http\Resources\SongCollection;
use App\Http\Resources\SongResource;

class PlaylistSongController extends Controller
{
    public function index(PlaylistSongRequest $req, Playlist $playlist)
    {
        return new SongCollection($playlist->_songs);
    }

    public function store(PlaylistSongRequest $req, Playlist $playlist)
    {
        $playlist->_songs()->syncWithoutDetaching($req->songs);

        return response()->json([
            "msg" => "song(s) added to playlist successfully",
        ], 201);
    }

    public function destroy(PlaylistSongRequest $req, Playlist $playlist, Song $song)
    {
        $playlist->_songs()->detach($req->songs);

        return response()->json([
            "msg" => "song(s) deleted from playlist successfully",
        ], 201);
    }
}
