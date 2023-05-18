<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;
    protected $fillable = [
        "title",
        "description",
        "private",
        "user",
        "file",
    ];

    function _user(){
        return $this->belongsTo(User::class, "user");
    }
    function _songs(){
        return $this->belongsToMany(Song::class, "playlist_songs", "playlist", "song");
    }
}
