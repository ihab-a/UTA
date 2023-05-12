<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaylistRequest extends FormRequest
{
    use JsonFailedValidation;
    public function authorize(): bool
    {
        $method = $this->method();

        if(in_array($method, ["PUT", "DELETE"]))
            return $this->playlist->user === AUTH_USER->id;

        return true;
    }

    public function rules(): array
    {
        $method = $this->method();

        if($method === "POST")
            return [
                "title" => "required|string",
                "description" => "string",
                "private" => "boolean",
            ];

        if($method === "PUT")
            return [
                "title" => "string",
                "description" => "string",
                "private" => "boolean",
            ];

        return [];
    }
}
