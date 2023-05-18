<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;
    function _songs(){
        return $this->belongsToMany(Song::class, "song_genres", "genre", "song");
    }
}
