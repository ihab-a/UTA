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
                "user" => new UserResource($song->_user),
            ];
        });
    }
}
