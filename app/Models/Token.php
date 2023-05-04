<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;
    protected $primaryKey = "token";
    protected $fillable = [
        "token",
        "user",
    ];

    function _user(){
        return $this -> belongsTo(User::class, "user");
    }

    static function generate(User $user){
        // get a very random string
        $staticRandomString = "52ac8875efcc92596047bc7d848d19f4bef465b438858de51c0edf6d077ce463bfcd25fc8dcae0b98aed5a7c1578dd3e27b6e055f626f1ba13091491a710c0e3";
        $randomizer = hash("sha256", $staticRandomString) . rand() . time() . $staticRandomString;

        $token = hash("sha256", "{$user->id}$randomizer{$user->name}");

        // add token for the user
        static::create([
            // store token hash
            "token" => hash("sha512", $token),
            "user" => $user -> id,
        ]);

        return $token;
    }
}
