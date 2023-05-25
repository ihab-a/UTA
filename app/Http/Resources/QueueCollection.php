<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class QueueCollection extends ResourceCollection
{
    static $wrap = false;
    public function toArray(Request $request)
    {
        return [
            "queue" => $this->collection->map(function ($song){
                return [
                    "id" => $song->id,
                    "title" => $song->title,
                    "likes" => $song->_likes()->count(),
                    "user" => new ShortUserResource($song->_user),
                    "liked" => defined(AUTH_USER) ? Song::find(1)->whereHas("_likes", fn($q)=>$q->where("id", AUTH_USER))->exists() : false,
                    "time" => $song->pivot->time,
                ];
            }),
            "offset" => defined("AUTH_USER") ? AUTH_USER->queue_offset : null,
        ];
    }
}
