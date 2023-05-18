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
        $queue = AUTH_USER->_queue();
        $queue->sync($req->queue);

        return response()->json([
            "msg" => "success",
            "queue" => new QueueCollection($queue->get()),
        ]);
    }
}
