<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Playlist;
use App\Models\File;
use App\Http\Requests\StreamRequest;

class StreamController extends Controller
{
    public function song(StreamRequest $req, Song $song)
    {
        $file = File::_get($song->file);

        $stream = fopen($file['path'], 'rb');
        $fileSize = filesize($file['path']);

        $start = 0;
        // if ranges were not provided return the whole file
        $end = $fileSize - 1;

        $length = $fileSize;

        $headers = [
            'Content-Type' => $file['headers']['Content-Type'],
            'Content-Length' => $length,
            'Accept-Ranges' => 'bytes',
        ];

        if ($req->headers->has('Range')) {
            $range = $req->headers->get('Range');
            $range = str_replace('bytes=', '', $range);

            [$start, $end] = explode('-', $range);

            $start = max(0, intval($start));
            $end = min($end ?: $start + 122880, $fileSize - 1);
            $length = $end - $start + 1;

            $headers['Content-Range'] = 'bytes ' . $start . '-' . $end . '/' . $fileSize;
            $headers['Content-Length'] = $length;

            fseek($stream, $start);
        }

        $response = response()->stream(function () use ($stream, $length, $end) {
            // read the portion required in chunks to optimise memory
            while (!feof($stream) && ($p = ftell($stream)) <= $end) {
                if ($p + 8192 > $end) {
                    // Last chunk
                    echo fread($stream, $end - $p + 1);
                } else {
                    echo fread($stream, 8192);
                }
            }
            fclose($stream);
        }, 206, $headers);

        return $response;
    }
}