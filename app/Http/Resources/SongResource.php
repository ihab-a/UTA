<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Models\Song;
use Illuminate\Http\Resources\Json\JsonResource;

class SongResource extends JsonResource
{
    static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "likes" => $this->_likes()->count(),
            "user" => new UserResource($this->_user),
            "genres" => $this->_genres,
            "liked" => defined("AUTH_USER") ? AUTH_USER->_hadLikedSong($this->id) : false,
        ];
    }
}
