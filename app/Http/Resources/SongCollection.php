<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SongCollection extends ResourceCollection
{
    static $wrap = false;
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($song){
            return [
                "id" => $song->id,
                "title" => $song->title,
                "likes" => $song->_likes()->count(),
                "user" => new ShortUserResource($song->_user),
                "liked" => defined("AUTH_USER") ? AUTH_USER->_hadLikedSong($song->id) : false,
            ];
        });
    }
}
