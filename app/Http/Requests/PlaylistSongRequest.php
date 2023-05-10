<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaylistSongRequest extends FormRequest
{
    public function authorize(): bool
    {
        $method = $this->method();

        if($method === "GET" && !$this->playlist->private)
            return true;

        return $this->playlist->user === AUTH_USER->id;
    }

    public function rules(): array
    {
        $method = $this->method();

        if(in_array($method, ["DELETE", "POST"]))
            return [
                "songs" => "array|required",
                "songs.*" => "int|exists:songs,id",
            ];

        return [];
    }
}
