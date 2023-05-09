<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;


Route::post("/auth/login", [AuthController::class, "login"]);
Route::post("/auth/signup", [AuthController::class, "signup"]);

Route::middleware("auth")->group(function (){
    Route::get("/auth", [AuthController::class, "index"]);
    Route::delete("/auth", [AuthController::class, "destroy"]);
    Route::apiResource("/notification", NotificationController::class)->only(["index", "update", "destroy"]);
});
