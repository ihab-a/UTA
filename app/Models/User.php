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
    function tokens(){
        return $this->hasMany(Token::class, "user");
    }
}
