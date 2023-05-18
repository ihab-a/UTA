<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Http\Requests\PlaylistRequest;
use App\Http\Resources\PlaylistResource;
use App\Http\Resources\PlaylistCollection;

class PlaylistController extends Controller
{
    public function index()
    {
        return new PlaylistCollection(AUTH_USER->_playlists);
    }

    public function store(PlaylistRequest $req)
    {
        $data = $req->only([
            "title",
            "description",
            "private",
        ]);

        $data["user"] = AUTH_USER->id;

        $created = Playlist::create($data);

        return response()->json([
            "msg" => "playlist created successfully",
            "created" => new PlaylistResource($created),
        ], 201);
    }

    public function show(Playlist $playlist)
    {
        if($playlist->private && $playlist->user !== AUTH_USER->id)
            return response()->json([
                "msg" => "access denied"
            ], 403);

        return new PlaylistResource($playlist);
    }

    public function update(PlaylistRequest $req, Playlist $playlist)
    {
        $data = $req->only([
            "title",
            "description",
            "private",
        ]);

        $data["user"] = AUTH_USER->id;

        $updated = $playlist->update($data);

        return response()->json([
            "msg" => "playlist updated successfully",
            "updated" => new PlaylistResource($updated),
        ], 201);
    }

    public function destroy(PlaylistRequest $req, Playlist $playlist)
    {
        $playlist->delete();

        return response()->json([
            "msg" => "playlist deleted successfully",
        ], 200);
    }
}
