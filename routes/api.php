<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post("/auth", [AuthController::class, "store"]);

Route::middleware("auth")->group(function (){
    Route::get("/auth", [AuthController::class, "index"]);
    Route::delete("/auth", [AuthController::class, "destroy"]);
});
