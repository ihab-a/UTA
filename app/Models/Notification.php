<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        "content",
        "read",
        "user"
    ];
    function _user(){
        return $this->belongsTo(User::class, "user");
    }
    static function forUser($content, $user=null){
        // if user not specified notify AUTH_USER
        $user = $user ?? AUTH_USER->id;

        return static::create([
            "content" => $content,
            "user" => $user,
        ]);
    }
}
