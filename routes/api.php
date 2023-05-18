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
    Route::post("/song/{song}/like", [SongLikeController::class, "store"]);
    Route::apiResource("/song/{song}/genre", SongGenreController::class)->only(["store"]);
    Route::delete("/song/{song}/genre", [SongGenreController::class, "destroy"]);
    Route::apiResource("/notification", NotificationController::class)->only(["index", "update", "destroy"]);
    Route::get("/playlist/liked", [SongLikeController::class, "index"]);
    Route::apiResource("/playlist", PlaylistController::class);
    Route::apiResource("/playlist/{playlist}/song", PlaylistSongController::class)->only(["store", "index"]);
    Route::delete("/playlist/{playlist}/song", [PlaylistSongController::class, "destroy"]);
    Route::post("/search", [SearchController::class, "store"]);
    Route::apiResource("/for-you", SuggestionController::class)->only(["index", "store"]);
    Route::apiResource("/queue", QueueController::class)->only(["index", "store"]);
});

    Route::get("/song/{song}/listen", [StreamController::class, "song"]);
    Route::get("/playlist/{playlist}/listen", [StreamController::class, "playlist"]);