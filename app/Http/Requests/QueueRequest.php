<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QueueRequest extends FormRequest
{
    use JsonFailedValidation;
    public function authorize(): bool
    {
        return defined("AUTH_USER");
    }

    public function rules(): array
    {
        $method = $this->method();

        if($method === "POST")
            return [
                "queue" => "required|array",
                "queue.*.song" => "required|exists:songs,id",
                "queue.*.time" => "int",
            ];

        return [];
    }
}
