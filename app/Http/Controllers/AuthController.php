<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Token;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index()
    {
        // this has to go through the middleware
        // the AuthRequest checks that AUTH_USER is defined
        return new UserResource(AUTH_USER);
    }

    public function login(Request $req)
    {
        $credentials = $req->only([
            "email",
            "password",
        ]);

        $targetUser = User::where("email", $req->email)->first();

        if(!$targetUser)
            abort(400, "this email was not found");

        if(Hash::check($req->password, $targetUser->password))
            $token = Token::generate($targetUser);
        else
            abort(401, "this password is incorrect");

        return response()->json([
            "token" => $token
        ], 200);
    }

    public function signup(AuthRequest $req){
        $data = $req->only([
            "username",
            "email",
            "password",
        ]);
        
        $data["password"] = Hash::make($data["password"]);

        $created = User::create($data);

        // generate a token for the user
        $token = Token::generate($created);

        return response()->json([
            "token" => $token
        ], 201);
    }

    public function destroy(User $auth)
    {
        // delete the token to logout
        AUTH_TOKEN->delete();

        return response()->json([
            "msg" => "logout successfull"
        ], 200);
    }
}
