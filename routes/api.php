<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/auth/login", [AuthController::class, "login"]);
Route::post("/auth/signup", [AuthController::class, "signup"]);

Route::middleware("auth")->group(function (){
    Route::delete("/auth/logout", [AuthController::class, "logout"]);

    Route::get("/auth", [AuthController::class, "index"]);
    Route::put("/auth", [AuthController::class, "update"]);
    Route::delete("/auth", [AuthController::class, "destroy"]);

    Route::apiResource("/song", SongController::class);
    Route::apiResource("/notification", NotificationController::class)->only(["index", "update", "destroy"]);
});
