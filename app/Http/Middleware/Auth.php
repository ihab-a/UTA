<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Token;

class Auth
{
    public function handle(Request $req, Closure $next)
    {
        $token = Token::where("token", hash(
            "sha512",
            $req->header("Authorization", "")
        ))->first();

        if(!$token)
            abort(401, "invalid token, please login first");

        // if token is present user is always present, this is ensured by the database schema
        define("AUTH_USER", $token -> _user);
        define("AUTH_TOKEN", $token);

        return $next($req);
    }
}
