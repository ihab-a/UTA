<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\NotificationRequest;
use App\Http\Resources\NotificationCollection;
use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    public function index()
    {
        // return all auth user's notifications
        return new NotificationCollection(AUTH_USER->_notifications);
    }
    public function update(NotificationRequest $req, notification $notification)
    {
        // set notification read status
        $notification->update([
            "read" => $req->read ? now() : null,
        ]);

        return response()->json([
            "msg" => "success",
            "updated" => new NotificationResource($notification),
        ], 200);
    }
    public function destroy(notification $notification)
    {
        $notification->delete();
        return response()->json(["msg" => "success"], 200);
    }
}
