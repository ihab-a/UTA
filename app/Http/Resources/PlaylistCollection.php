<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PlaylistCollection extends ResourceCollection
{
    static $wrap = false;
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($playlist){
            return [
                "id" => $playlist->id,
                "title" => $playlist->title,
                "user" => new ShortUserResource($playlist->_user),
            ];
        });
    }
}
