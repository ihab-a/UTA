<?php

namespace App\Http\Controllers;

use App\Models\Queue;
use App\Http\Requests\QueueRequest;
use App\Http\Resources\QueueCollection;

class QueueController extends Controller
{
    public function index()
    {
        return response()->json(
            new QueueCollection(AUTH_USER->_queue)
        , 200);
    }

    public function store(QueueRequest $req)
    {
        if($req->queue ?? false)
            AUTH_USER->_queue()->sync($req->queue);
        
        if($req->offset ?? false)
            AUTH_USER->update([
                "queue_offset" => $req->offset,
            ]);

        return response()->json([
            "msg" => "success",
        ]);
    }
}
