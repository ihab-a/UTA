<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SongRequest extends FormRequest
{
    use JsonFailedValidation;
    public function authorize(): bool
    {
        $method = $this->method();
        
        if(in_array($method, ["PUT", "DELETE"]))
            return $this->song->user === AUTH_USER->id;

        return true;
    }

    public function rules(): array
    {
        $method = $this->method();

        if($method === "POST")
            return [
                "title" => "string|required",
                "description" => "string",
                "file" => "required|file",
            ];

        if($method === "PUT")
            return [
                "title" => "string",
                "description" => "string",
                "file" => "file",
            ];

        return [];
    }
}
