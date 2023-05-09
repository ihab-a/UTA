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

    public function update(AuthRequest $req){
        $data = $req->only([
            "username",
            "firstname",
            "lastname",
            "email",
            "password",
        ]);

        if($data["password"] ?? false)
            $data["password"] = Hash::make($data["password"]);

        AUTH_USER->update($data);

        return response()->json([
            "msg" => "success",
            "user" => new UserResource(AUTH_USER),
        ], 200);
    }

    public function destroy(AuthRequest $req){
        AUTH_USER->delete();
        return response()->json(["msg" => "success"], 200);
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
            "token" => $token,
            "user" => new UserResource($targetUser),
        ], 200);
    }

    public function signup(AuthRequest $req){
        $data = $req->only([
            "username",
            "firstname",
            "lastname",
            "email",
            "password",
        ]);
        
        $data["password"] = Hash::make($data["password"]);

        $created = User::create($data);

        // generate a token for the user
        $token = Token::generate($created);

        return response()->json([
            "token" => $token,
            "user" => new UserResource($created),
        ], 201);
    }

    public function logout(User $auth)
    {
        // delete the token to logout
        AUTH_TOKEN->delete();

        return response()->json([
            "msg" => "logout successfull"
        ], 200);
    }
}
