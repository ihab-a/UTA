<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;
    protected $fillable = [
        "title",
        "description",
        "user",
    ];

    function _user(){
        return $this->belongsTo(User::class, "user");
    }

    function _likes(){
        return $this->belongsToMany(User::class, "song_likes", "song", "user");
    }

    function _genres(){
        return $this->belongsToMany(Genre::class, "song_genres", "song", "genre");
    }
}
