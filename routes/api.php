<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/auth/login", [AuthController::class, "login"]);
Route::post("/auth/signup", [AuthController::class, "signup"]);

Route::middleware("auth")->group(function (){
    Route::get("/auth", [AuthController::class, "index"]);
    Route::delete("/auth", [AuthController::class, "destroy"]);
    Route::apiResource("/notification", NotificationController::class)->only(["index", "update", "destroy"]);
});
