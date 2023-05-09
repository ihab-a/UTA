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
}
