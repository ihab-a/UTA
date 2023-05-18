<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SuggestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return defined("AUTH_USER");
    }

    public function rules(): array
    {
        $method = $this->method();

        if($method === "POST")
            return [
                "song" => "required|exists:songs,id",
            ];

        return [];
    }
}
