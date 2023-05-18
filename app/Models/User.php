<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $fillable = [
        "username",
        "firstname",
        "email",
        "lastname",
        "password",
        "profile",
    ];
    function _tokens(){
        return $this->hasMany(Token::class, "user");
    }
    function _notifications(){
        return $this->hasMany(Notification::class, "user");
    }
    function _songs(){
        return $this->hasMany(Song::class, "user");
    }
    function _likedSongs(){
        return $this->belongsToMany(Song::class, "song_likes", "user", "song");
    }
    function _plays(){
        return $this->belongsToMany(Song::class, "song_plays", "user", "song");
    }
    function _queue(){
        return $this->belongsToMany(Song::class, "queues", "user", "song")->withPivot("time");
    }
    function _hadLikedSong($song){
        // if the song is a model object get the id
        $song = $song->id ?? $song;

        return $this->whereHas("_likedSongs", fn($q)=>$q->where("id", $song))->exists();
    }
}
