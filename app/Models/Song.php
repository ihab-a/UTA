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
}
