<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\File;
use App\Http\Requests\SongRequest;
use App\Http\Resources\SongCollection;
use App\Http\Resources\SongResource;

class SongController extends Controller
{
    public function index()
    {
        // get song suggestions
        return new SongCollection(Song::inRandomOrder()->limit(10)->get());
    }

    public function store(SongRequest $req)
    {
        // store the song file
        $file = File::_store();

        // store a song
        $data = $req->only([
            "title",
            "description",
        ]);

        $data["user"] = AUTH_USER->id;

        // store song file
        $data["file"] = $file->id;

        $created = Song::create($data);

        return response()->json([
            "msg" => "song created successfully",
            "created" => new SongResource($created),
        ], 201);
    }

    public function show(Song $song)
    {
        return new SongResource($song);
    }

    public function update(SongRequest $req, Song $song)
    {
        // store a song
        $data = $req->only([
            "title",
            "description",
        ]);

        $song->update($data);

        return response()->json([
            "msg" => "song updated successfully",
            "updated" => new SongResource($song),
        ], 201);
    }

    public function destroy(SongRequest $req, Song $song)
    {
        $song->delete();

        return response()->json([
            "msg" => "song deleted succesfully",
        ], 200);
    }
}
